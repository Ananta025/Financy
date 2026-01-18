import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MongoClient, ObjectId } from 'mongodb';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();
import httpStatus from "http-status";

let mongo_url = process.env.MONGO_URL;

let client;

async function connectClient(){
    if(!client){
        client = new MongoClient(mongo_url);
    }
    await client.connect();
}

export const signUp = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ email });
        if(user){
            return res.status(httpStatus.BAD_REQUEST).send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
        };
        const result = await db.collection("users").insertOne(newUser);
        const token = jwt.sign({ userId: result.insertedId }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(httpStatus.CREATED).json({ token, userId: result.insertedId });
    }catch(err){
        console.error("Error during sign up",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

export const signIn = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    
    // SECURITY: Ensure inputs are strings (prevent NoSQL injection)
    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid input types'
        });
    }
    
    email = email.trim();
    
    try{
        await connectClient();
        const db = client.db("financy");
        
        // SECURITY: Query is now safe - express-mongo-sanitize strips $ operators
        const user = await db.collection("users").findOne({ email });
        
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: 'Invalid credentials'  // Don't reveal if user exists
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid credentials'  // Same error as above
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(httpStatus.OK).json({ token, userId: user._id });
    }catch(err){
        console.error("Error during sign in",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getAllUsers = async (req, res) => {
    // SECURITY: This endpoint should be admin-only or removed
    // For now, adding auth middleware and removing sensitive data
    try{
        await connectClient();
        const db = client.db("financy");
        const users = await db.collection("users").find({}).toArray();
        
        // SECURITY: Never expose password hashes
        const sanitizedUsers = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        return res.status(httpStatus.OK).json(sanitizedUsers);
    }catch(err){
        console.error("Error during fatching users",err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    
    // SECURITY: Verify user can only access their own profile
    if (userId !== req.user.userId.toString()) {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            message: 'Access denied. You can only view your own profile.'
        });
    }
    
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        
        // SECURITY: Never return password hash
        const { password, ...userWithoutPassword } = user;
        
        return res.status(httpStatus.OK).json(userWithoutPassword);
    }catch(err){
        console.error("Error during fetching user profile",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    
    // SECURITY: Verify user can only update their own profile
    if (userId !== req.user.userId.toString()) {
        return res.status(httpStatus.FORBIDDEN).json({
            success: false,
            message: 'Access denied. You can only update your own profile.'
        });
    }
    
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        
        // Prepare update object
        const updateData = {};
        
        // SECURITY: Validate and sanitize each field
        if (name && name.trim().length > 0) {
            updateData.name = name.trim();
        }
        
        if (email && email.trim().length > 0) {
            // Check if new email already exists
            const existingUser = await db.collection("users").findOne({ 
                email: email.trim(),
                _id: { $ne: new ObjectId(userId) }
            });
            if (existingUser) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
            updateData.email = email.trim();
        }
        
        if (password && password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        
        if (Object.keys(updateData).length === 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'No valid fields to update'
            });
        }
        
        await db.collection("users").updateOne({ _id: new ObjectId(userId) }, {
            $set: updateData
        });
        return res.status(httpStatus.OK).json({
            success: true,
            message: 'User Profile Updated'
        });
    }catch(err){
        console.error("Error during updating user profile",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const deleteUserProfile = async (req, res) => {
    const userId = req.params.id;
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        await db.collection("users").deleteOne({ 
            _id: new ObjectId(userId)
         });
        return res.status(httpStatus.OK).send("User Profile Deleted");
    }catch(err){
        console.error("Error while deleting profile",err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

// Add this new function
const validateToken = (req, res) => {
  // If the auth middleware passed, the token is valid
  return res.status(httpStatus.OK).json({
    valid: true,
    userId: req.user.userId
  });
};

export { 
  getAllUsers, 
  getUserProfile, 
  updateUserProfile, 
  deleteUserProfile,
  validateToken  // Export the new function
};
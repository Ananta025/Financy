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

// Auth removed - signup function deleted

// Auth removed - signIn function deleted

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
    
    // No auth check - public access
    
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        
        // Never return password hash
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
    
    // No auth check - public access
    
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
        
        // Validate and sanitize each field
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

export { 
  getAllUsers, 
  getUserProfile, 
  updateUserProfile, 
  deleteUserProfile
};
// import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
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

    const { email, password } = req.body;
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ email });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).send("Invalid credentials");
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(httpStatus.OK).json({ token, userId: user._id });
    }catch(err){
        console.error("Error during sign in",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getAllUsers = async (req, res) => {
    try{
        await connectClient();
        const db = client.db("financy");
        const users = await db.collection("users").find({}).toArray();
        return res.status(httpStatus.OK).json(users);
    }catch(err){
        console.error("Error during fatching users",err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new MongoClient.ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        return res.status(httpStatus.OK).json(user);
    }catch(err){
        console.error("Error during fetching user profile",err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    try{
        await connectClient();
        const db = client.db("financy");
        const user = await db.collection("users").findOne({ 
            _id: new MongoClient.ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("users").updateOne({ _id: new MongoClient.ObjectId(userId) }, {
            $set: {
                name,
                email,
                password: hashedPassword
            }
        });
        return res.status(httpStatus.OK).send("User Profile Updated");
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
            _id: new MongoClient.ObjectId(userId)
         });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).send("User not found!");
        }
        await db.collection("users").deleteOne({ 
            _id: new MongoClient.ObjectId(userId)
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
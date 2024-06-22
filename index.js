import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRouter from "./routes/routes.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const port=5000;

mongoose.connect('mongodb://127.0.0.1:27017/chatapp').then(()=>{
    console.log("Connected to mongodb");
}).catch((error)=>{
console.log("Mogodb is failed to connect",error)
})



app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api',userRouter);
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
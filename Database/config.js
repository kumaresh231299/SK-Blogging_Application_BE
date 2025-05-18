import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDB_URL = process.env.MONGODB_URL;

const connectDB = async(req,res)=>{
    try {
        const connection = await mongoose.connect(MongoDB_URL);
        console.log("MONGO Connected..!");
        return connection
    } catch (error) {
        console.log("MONGODB Connectio Error : ",error)
    }
}

export default connectDB;
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/config.js";
import authRoute from "./Routes/authRoute.js";
import blogRoute from "./Routes/blogRoute.js";

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors({
    origin:"*",
    credentials:true
}))

//Connect to database
connectDB();

//Api Routes
app.use("/auth",authRoute);
app.use("/blogs",blogRoute);

//Default Router
app.get("/",(req,res)=>{
    res.status(200).send("Hi, Welcome to our Sk's Blopping Application..!")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.MODE_OF_PROCESSING} mode on port ${PORT}`);
})
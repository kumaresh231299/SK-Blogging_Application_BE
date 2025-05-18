import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validation
        if (!name) {
            return res.status(400).json({ error: "Please provide name" });
        }
        if (!email) {
            return res.status(400).json({ error: "Please provide email" });
        }
        if (!password) {
            return res.status(400).json({ error: "Please provide password" });
        }

        //Check user already exists
        const exist = await User.findOne({ email: email });
        if (exist) {
            return res.status(400).json({ error: "User already exists" });
        }

        //Encrypt password
        const hashpassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new User({ name, email, password: hashpassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }

        //Check user already exists
        const userDetails = await User.findOne({ email:email });
        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        //Compare password
        const isMatch = await bcrypt.compare(password, userDetails.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: userDetails._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d", }
        );

        res.status(200).json({
            message: "User login successfully",
            token,
            userDetails: {
                id: userDetails._id,
                name: userDetails.name,
                email: userDetails.email,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" })
        console.log(error)
        console.log("JWT Seecret : ",process.env.JWT_SECRET_KEY)
    }
};

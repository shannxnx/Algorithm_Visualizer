import { Request, Response } from "express";
import AdminAuth from "../models/auth.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/genToken";


export const Signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ message: "Fill out all details!" });
        if (email.length < 4) return res.status(400).json({ message: "Characters must be greater than or equals 5!" });
        if (password.length < 6) return res.status(400).json({ message: "Characters must be greater than or equals 6!" });

        const existing = await AdminAuth.findOne({ email });

        if (existing) return res.status(400).json({ message: "This user already exist!" });

        const salt = await bcrypt.genSalt(10);


        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new AdminAuth({
            email,
            password: hashedPassword
        });


        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: "Sign Up Succesfully!" });
        }
        else {
            return res.status(400).json({ message: "Invalid User Data!" });
        }







    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in signup: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
}



export const AdminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(404).json({ message: "Fill out inputs!" });
        if (email != "admin") return res.status(404).json({ message: "Invalid Credentials!" });
        if (password != "admin_admin") return res.status(404).json({ message: "Invalid Credentials!" });

        const user = await AdminAuth.findOne({ email });
        if (!user) return res.status(400).json({ message: "No such thing exists!" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials!!" });


        generateToken(user._id, res);
        res.status(200).json({ _id: user._id, email: user.email });



    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in admin login: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};



export const Logout = async (req: Request, res: Response) => {
    const userId = req.user._id;
    try {
        res.cookie("jwt", "", { maxAge: 0 });

        const user = await AdminAuth.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (user) {
            res.status(200).json({ message: "Logged out successfully" });
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in logout: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};



export const checkAuth = async (req: Request, res: Response) => {
    const userId = req.user._id;
    try {

        if (!userId) return res.status(404).json({ message: "No user Exist!" });


        const user = await AdminAuth.findById(userId).select("-password");


        if (!user) return res.status(404).json({ message: "No user Exist!" });

        res.status(200).json(user);


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in checkAuth: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }

    }
}
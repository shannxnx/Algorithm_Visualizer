import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminAuth from "../models/auth.model";

dotenv.config();

interface JwtPayload {
    userId: string;
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await adminAuth.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!!" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

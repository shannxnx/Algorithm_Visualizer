import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminAuth from "../models/auth.model";
import { ObjectId } from "mongoose";

dotenv.config();

interface JwtPayload {
    userId: ObjectId;
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await AdminAuth.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!!" });
        }

        req.user = user;
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in protectroute: ", error.message);
            res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
    }
};

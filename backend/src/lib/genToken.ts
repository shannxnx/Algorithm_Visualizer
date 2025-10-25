import jwt from "jsonwebtoken";
import { Response } from "express"
import { ObjectId } from "mongoose";


export const generateToken = (userId: any, res: Response) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development"
    });


    return token;

}





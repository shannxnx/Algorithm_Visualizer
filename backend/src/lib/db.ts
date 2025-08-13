import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI!);
        const start = Date.now();
        console.log("MongoDB connected: ", connect.connection.host);
    } catch (error: any) {
        console.log("Error in Connecting to MONGODB: ", error.message);
    }
}



import mongoose, { Document, Schema } from "mongoose";

interface AdminAuth extends Document {
    email: string,
    password: string;
};


const AuthSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
}, { timestamps: true });


export default mongoose.model<AdminAuth>("Admin", AuthSchema);
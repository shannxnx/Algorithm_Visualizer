import mongoose, { Document, Schema } from "mongoose"

interface AlgoData extends Document {
    algoName: String,
    algoInfo: String,
    codes: Record<string, string>
}


const AlgorithmInfoSchema: Schema = new Schema({
    algoName: { type: String, required: true },
    algoInfo: { type: String, required: true },
    codes: { type: Map, of: String, required: true }
}, { timestamps: true });

export default mongoose.model<AlgoData>("Algorithm", AlgorithmInfoSchema)
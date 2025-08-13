
import mongoose from "mongoose"

const AlgorithmInfoSchema = new mongoose.Schema({
    algoName: { type: String, required: true },
    algoInfo: { type: String, required: true },
    codes: {
        javascript: { type: String, default: "" },
        cpp: { type: String, default: "" },
        c: { type: String, default: "" },
        csharp: { type: String, default: "" },
        python: { type: String, default: "" },
        java: { type: String, default: "" },
        php: { type: String, default: "" },
    }

})

const AlgorithmInfo = mongoose.model("Algorithm", AlgorithmInfoSchema);

export default AlgorithmInfo;
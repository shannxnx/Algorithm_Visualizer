import { Request, Response } from "express"
import AlgorithmInfo from "../models/sortAlgoInfo.model";

export const getDFS = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Depth-First Search (DFS)" });
        if (!data) return res.status(404).json({ message: "No such algorithm exists!" });

        res.status(200).json(data);


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
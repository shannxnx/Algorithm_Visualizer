import { Request, Response } from "express"
import AlgorithmInfo from "../models/sortAlgoInfo.model";

export const getDFS = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Depth-First Search (DFS)" });
        if (!data) return res.status(404).json({ message: "No such algorithm exists!" });

        res.status(200).json(data);


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getBFS = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "Breadth-First Search (BFS)" });
        if (!data) return res.status(404).json({ message: "No such algorithm exists!" });

        res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getDijkstras = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "Dijkstra's Algorithm" });
        if (!data) return res.status(404).json({ message: "No such algorithm exists!" });

        res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getAStar = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "A-Star Algorithm" });
        if (!data) return res.status(404).json({ message: "No such algorithm exists!" });

        res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
}
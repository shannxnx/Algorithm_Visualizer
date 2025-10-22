import { Request, Response } from "express";
import AlgorithmInfo from "../models/sortAlgoInfo.model";



export const getBinarySearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Binary Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
}


export const getLinearSearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Linear Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getInterpolationSearchInfo = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "Interpolation Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getJumpSearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Jump Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getExponentialSearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Exponential Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};


export const getTernarySearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Ternary Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Internal Server Error: ", error.message);
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).json({ message: `Internal Server Error:${errorMessage} ` });
        }
    }
};



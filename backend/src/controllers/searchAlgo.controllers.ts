import { Request, Response } from "express";
import AlgorithmInfo from "../models/sortAlgoInfo.model";



export const getBinarySearchInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Binary Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });

        res.status(200).json(data);



    } catch (error: any) {
        console.log("Internal Server Error!", error?.message);
        res.status(500).json({ message: "Internal Error Server!" });
    }
}


export const getLinearSearchInfo = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "Linear Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });

        res.status(200).json(data);
    } catch (error: any) {
        console.log("Internal Server Error!", error?.message);
        res.status(500).json({ message: "Internal Error Server!" });
    }
};


export const getInterpolationSearchInfo = async (req: Request, res: Response) => {
    try {
        const data = await AlgorithmInfo.findOne({ algoName: "Interpolation Search" });
        if (!data) return res.status(404).json({ message: "No such algorithm exist!" });
        res.status(200).json(data);


    } catch (error: any) {
        console.log("Internal Server Error!", error?.message);
        res.status(500).json({ message: "Internal Error Server!" });
    }
}
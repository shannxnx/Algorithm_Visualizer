import { Response, Request } from "express"
import AlgorithmInfo from "../models/sortAlgoInfo.model";


export const getBubbleSortInfo = async (req: Request, res: Response) => {
    try {

        const data = await AlgorithmInfo.findOne({ algoName: "Bubble Sort" });
        if (!data) return res.status(404).json({ message: "No such thing Exist!" });

        res.status(200).json(data);

    } catch (error: any) {
        console.log("Internal Server Error!", error?.message);
        res.status(500).json({ message: "Internal Error Server!" });
    }
}
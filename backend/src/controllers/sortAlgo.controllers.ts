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
};


export const postBubbleSort = async (req: Request, res: Response) => {
    const { algoInfo, algoName, codes } = req.body;

    try {

        const existing = await AlgorithmInfo.findOne({ algoName: algoName });
        if (existing) {
            return res.status(200).json(existing);
        }

        const newInfo = new AlgorithmInfo({
            algoInfo,
            algoName,
            codes
        });

        if (newInfo) {
            await newInfo.save();
            res.status(200).json(newInfo);
        }



    } catch (error: any) {
        console.log("Internal Server Error!", error.message);
        res.status(500).json({ message: "Internal Server Error!" })
    }
};


export const postMergeSort = async (req: Request, res: Response) => {
    const { algoInfo, algoName, codes } = req.body;
    try {
        const existing = await AlgorithmInfo.findOne({ algoName: algoName });
        if (existing) {
            return res.status(200).json(existing);
        }


        const mergeSort = new AlgorithmInfo({
            algoName,
            algoInfo,
            codes
        });
        await mergeSort.save();


        res.status(200).json(mergeSort);


    } catch (error: any) {
        console.log("Internal Server Error!", error.message);
        res.status(500).json({ message: "Internal Server Error!" })
    }
}


export const getMergeSortInfo = async (req: Request, res: Response) => {
    try {
        const mergeSortInfo = await AlgorithmInfo.findOne({ algoName: "Merge Sort" });
        if (!mergeSortInfo) return res.status(400).json({ messagee: "No such thing exist!" });


        res.status(200).json(mergeSortInfo);



    } catch (error: any) {
        console.log("Internal Server Error!", error.message);
        res.status(500).json({ message: "Internal Server Error!" })

    }
}
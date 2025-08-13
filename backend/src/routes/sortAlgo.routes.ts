import express from "express";
import { getBubbleSortInfo, getMergeSortInfo, postBubbleSort, postMergeSort } from "../controllers/sortAlgo.controllers";


const router = express.Router();


router.post("/sort/bubble-sort/post", postBubbleSort);
router.get("/sort/bubble-sort", getBubbleSortInfo);
router.post("/sort/merge-sort/post", postMergeSort);
router.get("/sort/merge-sort", getMergeSortInfo)


export default router;
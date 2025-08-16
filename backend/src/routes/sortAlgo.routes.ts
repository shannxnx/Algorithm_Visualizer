import express from "express";
import { editSortCode, getBubbleSortInfo, getMergeSortInfo, postBubbleSort, postMergeSort } from "../controllers/sortAlgo.controllers";
import { protectRoute } from "../middleware/protectRoute";


const router = express.Router();


router.post("/sort/bubble-sort/post", postBubbleSort);
router.get("/sort/bubble-sort", getBubbleSortInfo);
router.post("/sort/merge-sort/post", postMergeSort);
router.get("/sort/merge-sort", getMergeSortInfo);
router.post("/sort/edit", protectRoute, editSortCode);


export default router;
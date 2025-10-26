import express from "express";
import {
    editSortCode, getBubbleSortInfo, getInsertionSortInfo, getMergeSortInfo, getQuickSortInfo, getSelectionSortInfo, postBubbleSort, postMergeSort,
    postQuickSort,
    postSortAlgorithm
} from "../controllers/sortAlgo.controllers";
import { protectRoute } from "../middleware/protect.route";


const router = express.Router();


router.post("/sort/bubble-sort/post", postBubbleSort);
router.post("/sort/quick-sort/post", postQuickSort);
router.post("/sort/merge-sort/post", postMergeSort);


router.get("/sort/bubble-sort", getBubbleSortInfo);
router.get("/sort/merge-sort", getMergeSortInfo);
router.get("/sort/quick-sort", getQuickSortInfo);
router.get("/sort/insertion-sort", getInsertionSortInfo);
router.get("/sort/selection-sort", getSelectionSortInfo);




router.post("/sort/edit", protectRoute, editSortCode);
router.post("/sort/algo-post", postSortAlgorithm);


export default router;
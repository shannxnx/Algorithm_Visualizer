import express from "express";
import { getBubbleSortInfo, postBubbleSortInfo } from "../controllers/sortAlgo.controllers";


const router = express.Router();


router.post("/sort/bubble-sort/post", postBubbleSortInfo);
router.get("/sort/bubble-sort", getBubbleSortInfo);



export default router;
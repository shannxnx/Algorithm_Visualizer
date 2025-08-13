import express from "express";
import { getBubbleSortInfo } from "../controllers/sortAlgo.controllers";


const router = express.Router();


//router.post("/sort", )
router.get("/sort/bubble-sort", getBubbleSortInfo);



export default router;
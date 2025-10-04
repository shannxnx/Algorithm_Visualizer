import express from "express";
import { protectRoute } from "../middleware/protect.route";
import { postAlgorithm } from "../controllers/sortAlgo.controllers";
import { getBinarySearchInfo, getLinearSearchInfo } from "../controllers/searchAlgo.controllers";



const router = express.Router();


router.get("/binary-search", getBinarySearchInfo);
router.get("/linear-search", getLinearSearchInfo);

//router.post("/search/edit", protectRoute, editSearchCode);
router.post("/algo-post", protectRoute, postAlgorithm);

export default router;

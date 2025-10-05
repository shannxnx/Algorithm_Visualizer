import express from "express";
import { protectRoute } from "../middleware/protect.route";
import { postAlgorithm } from "../controllers/sortAlgo.controllers";
import {
    getBinarySearchInfo, getExponentialSearchInfo,
    getInterpolationSearchInfo, getJumpSearchInfo,
    getLinearSearchInfo, getTernarySearchInfo
} from "../controllers/searchAlgo.controllers";



const router = express.Router();


router.get("/binary-search", getBinarySearchInfo);
router.get("/linear-search", getLinearSearchInfo);
router.get("/interpolation-search", getInterpolationSearchInfo);
router.get("/jump-search", getJumpSearchInfo);
router.get("/exponential-search", getExponentialSearchInfo);
router.get("ternary-search", getTernarySearchInfo);


//router.post("/search/edit", protectRoute, editSearchCode);
router.post("/algo-post", protectRoute, postAlgorithm);

export default router;

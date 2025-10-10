import express from "express";
import { protectRoute } from "../middleware/protect.route";
import { postAlgorithm } from "../controllers/sortAlgo.controllers";
import { getAStar, getBFS, getDFS, getDijkstras } from "../controllers/pathfinding.controllers";


const router = express.Router();

router.get("/dfs", getDFS);
router.get("/bfs", getBFS);
router.get("/dijkstras", getDijkstras)
router.get("/a-star", getAStar)




router.post("/algo-post", protectRoute, postAlgorithm);

export default router;



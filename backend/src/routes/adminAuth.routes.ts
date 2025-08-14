
import express from "express";
import { AdminLogin, checkAuth, Logout, Signup } from "../controllers/adminAuth.controllers";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();



router.post("/login", AdminLogin);
router.post("/signup", Signup);
router.post("/logout", protectRoute, Logout);
router.get("/check", protectRoute, checkAuth);



export default router;
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./lib/db";
import SortAlgoRoutes from "../src/routes/sortAlgo.routes";
import SearchAlgoRoutes from "../src/routes/searchAlgo.routes";
import AdminRoutes from "../src/routes/adminAuth.routes";
import PathfindingRoutes from "./routes/pathFinding.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (id === "next") {
        next();
    }
    res.send(`Hello ${req.params.id}! (from typescript)`);

}, (req: Request, res: Response) => {
    res.send("Hello this is the next id!");
});


app.use("/algorithm/db", SortAlgoRoutes);
app.use("/secret/admin", AdminRoutes);
app.use("/algorithm/db/search", SearchAlgoRoutes);
app.use("/algorithm/db/pathfinding", PathfindingRoutes);


app.listen(PORT, () => {
    console.log("Connected to this http://localhost:", 5000);
    ConnectDB();

})
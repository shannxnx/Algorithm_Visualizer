import express, { Request, Response } from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./lib/db";
import SortAlgoRoutes from "../src/routes/sortAlgo.routes";
import AdminRoutes from "../src/routes/adminAuth.routes";
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

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Backend! (from typescript)");
});


app.use("/algorithm/db", SortAlgoRoutes);
app.use("/secret/admin", AdminRoutes);
//app.use("/search/db", SearchAlgoRoutes);

app.listen(PORT, () => {
    console.log("Connected to this http://localhost:", 5000);
    ConnectDB();

})
import express, { Request, Response } from "express";
import dotenv from "dotenv"
import { ConnectDB } from "./lib/db";
import SortAlgoRoutes from "../src/routes/sortAlgo.routes";

dotenv.config();

//HZoOOl2KRzHADyMe moongoose password

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello Backend! (from typescript)");
});


app.use("/algorithm/db/", SortAlgoRoutes);


app.listen(PORT, () => {
    console.log("Connected to this http://localhost:", 5000);
    ConnectDB();

})
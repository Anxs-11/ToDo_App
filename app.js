import express from "express";
import { config } from "dotenv"
import router from "./routes/users.js"
import taskrouter from "./routes/tasks.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();
config({
    path: "./data/configure.env"
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use("/api/v1/user", router)
app.use("/api/v1/task", taskrouter)

app.get("/", (req, res) => {
    res.send("NIce");
})
app.use(errorMiddleware);
import {config} from "dotenv";
import userRouter from "./routes/user.js";
import express from "express";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.js"
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
});

//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//using routes
app.use("/api/v1/users", userRouter); 
app.use('/api/v1/tasks', taskRoutes);


//Using error middleware
app.use(errorMiddleware);
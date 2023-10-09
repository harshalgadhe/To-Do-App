import express from "express";
import { createTask, getMyTask, updateTask, deleteTask} from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthenticated, createTask);

router.get("/my", isAuthenticated, getMyTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
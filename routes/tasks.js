import express from "express";
import { deleteTask, getMyTask, newtask, TickTask } from "../controllers/tasks.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newtask)
router.get("/my", isAuthenticated, getMyTask)
router.route("/:id").put(isAuthenticated, TickTask).delete(isAuthenticated, deleteTask);
export default router;
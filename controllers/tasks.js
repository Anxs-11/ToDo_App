import ErrorHandler from "../middleware/error.js";
import { task } from "../model/task.js"
export const newtask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await task.create({
            title,
            description,
            user: req.user,

        });

        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const tasks = await task.find({ user: userid });
        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}
export const TickTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const Task = await task.findById(id);
        if (!Task) return next(new ErrorHandler("Task Not Found", 404))
        Task.isCompleted = !Task.isCompleted;
        await Task.save();
        res.status(200).json({
            success: true,
            message: "Task Ticked Succesfully"
        })
    } catch (error) {
        next(error)
    }
}
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const Task = await task.findById(id);
        if (!Task) return next(new ErrorHandler("Task Not Found", 404))
        await Task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted Succesfully"
        })
    } catch (error) {
        next(error)
    }
}

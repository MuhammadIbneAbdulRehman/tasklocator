import express from "express";

import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controller/tasks.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const tasksroute = express.Router();

tasksroute.post("/addnewtask", authMiddleware, createTask);

tasksroute.get("/gettasks", authMiddleware, getTasks);

tasksroute.get("/getby/:id", authMiddleware, getTaskById);

tasksroute.put("/updatetask/:id", authMiddleware, updateTask);

tasksroute.delete("/deletetask/:id", authMiddleware, deleteTask);

export default tasksroute;
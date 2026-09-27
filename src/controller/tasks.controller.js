import Task from "../models/UserTask.model.js";

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const task = await Task.create({
            title,
            description,
            creator: req.user.id
        });

        return res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.log("CREATE TASK ERROR:", error);

        return res.status(500).json({
            message: "Server error while creating task",
            error: error.message
        });
    }
};



const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            creator: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks
        });

    } catch (error) {
        console.log("GET TASKS ERROR:", error);

        return res.status(500).json({
            message: "Server error while fetching tasks",
            error: error.message
        });
    }
};
// GET TASK BY ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({
            _id: id,
            creator: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task fetched successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching task"
        });
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = await Task.findOne({
            _id: id,
            creator: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (title !== undefined) {
            task.title = title;
        }

        if (description !== undefined) {
            task.description = description;
        }

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while updating task"
        });
    }
};


// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            creator: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while deleting task"
        });
    }
};


export {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
import mongoose from "mongoose";

const userTaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: [3, "Minimum 3 characters are allowed"],
            required: true
        },

        description: {
            type: String,
            required: true
        },

        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "A task must have the creator"]
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", userTaskSchema);

export default Task;
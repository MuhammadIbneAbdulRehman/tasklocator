import mongoose from "mongoose";

const userTaskSchema = new mongoose.Schema({
    title: {
        type: string,
        min: [true, 'minimum 3 characters are allowed'],
        required: true
    },
    discription: {
        type: string,
        required: true
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'A task must have the Creator']
    }
}, { timestamp: true })
const Task = mongoose.model("tasks", userTaskSchema);
export default Task
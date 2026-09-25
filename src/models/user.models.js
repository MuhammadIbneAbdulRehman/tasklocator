import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [ture, 'Atleast 3 charater are required'],
    },
    email: {
        type: String,
        unique: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timestamps: true })

const user = mongoose.model('user', userSchema);
export default user
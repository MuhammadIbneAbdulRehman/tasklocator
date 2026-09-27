import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [3, 'three charaters minimum required']
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User
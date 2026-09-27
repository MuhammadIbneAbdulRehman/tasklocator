import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configue from "../envconfigure/url.configure.js"
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const isAlreadyRegistered = await User.findOne({
            $or: [
                { name },
                { email }
            ]
        })
        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "Username or email already exist!!"
            });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashpassword })
        return res.status(201).json({
            message: "User Registerd successfully!!!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error during signUp" + error })
    }

}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required!!!" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!!!" })
        }
        const isrightpassword = await bcrypt.compare(password, user.password);
        if (!isrightpassword) {
            return res.status(401).json({ message: "Invalid credentials!!!" })
        }
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            configue.JWT_Token,
            { expiresIn: "4d" })
        return res.status(200).json({
            message: "Signed in successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error during signIn!!!" + error
        })
    }

}
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while fetching profile"
        });
    }
};
export { signup, signin, getMe }
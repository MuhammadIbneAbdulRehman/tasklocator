import mongoose from "mongoose"
import configue from "../envconfigure/url.configure.js"

const dbconfig = async () => {
    try {
        const connection = mongoose.connect(configue.MONGODB_URI);
        if (!connection) {
            console.log("Database connection fails");
        }
        console.log('Database connected successfull!!!')

    } catch (error) {
        console.error(error)
    }
}

export default dbconfig
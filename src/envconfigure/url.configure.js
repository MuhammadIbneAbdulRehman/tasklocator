import dotenv from 'dotenv';
dotenv.config();

const configue = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_Token: process.env.JWT_Token
}
export default configue;
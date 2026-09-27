import express from 'express'
import { getMe, signin, signup } from '../controller/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const authroute = express.Router()
authroute.post("/signup", signup)
authroute.post("/signin", signin)
authroute.get("/prifile", authMiddleware, getMe)

export default authroute;
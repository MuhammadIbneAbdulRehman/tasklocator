import express from 'express'
import { signin, signup } from '../controller/auth.controller.js'
const authroute = express.Router()
authroute.post("/signup", signup)
authroute.post("/signin", signin)

export default authroute;
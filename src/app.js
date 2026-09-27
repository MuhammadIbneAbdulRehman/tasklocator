import express from 'express';
import morgan from 'morgan'
import authroute from './router/auth.route.js';
import tasksroute from './router/tasks.route.js';
const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/api/auth", authroute);
app.use("/api/task", tasksroute);
export default app;
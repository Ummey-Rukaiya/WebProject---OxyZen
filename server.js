import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js'
import oxyzenRouter from './routes/oxyzenRoutes.js'
import userRouter from "./routes/userRoutes.js";

//new reminder
import reminderRoutes from './routes/reminderRoutes.js';
//new note
import noteRoutes from './routes/noteRoutes.js';

const app = express();
const port = process.env.PORT || 7700
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))
//new reminder
app.use('/api/reminders', reminderRoutes);
//new note
app.use('/api/notes', noteRoutes);

//API Endpoints
app.get('/', (req, res)=> res.send("API Working"));
app.use('/api/oxyzen', oxyzenRouter)
app.use('/api/user', userRouter)



app.listen(port, ()=> console.log(`Server started on PORT: ${port}`));


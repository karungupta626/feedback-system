import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

export default app;

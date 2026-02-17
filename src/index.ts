import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => app.listen(process.env.PORT, () => console.log('Backend running')))
  .catch(err => console.log(err));
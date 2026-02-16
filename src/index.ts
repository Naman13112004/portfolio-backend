import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Stores Markdown
  createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// API Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  const { password, title, content } = req.body;
  
  // Verify the fixed password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect Password' });
  }

  try {
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

mongoose.connect(process.env.MONGO_URI!)
  .then(() => app.listen(process.env.PORT, () => console.log('Backend running')))
  .catch(err => console.log(err));
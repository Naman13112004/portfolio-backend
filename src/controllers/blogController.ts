import { Blog } from "../models/db.js";
import type { Request, Response } from "express";

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
}

export const createBlog = async (req: Request, res: Response) => {
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
}

export const updateBlog = async (req: Request, res: Response) => {
  const { password, title, content } = req.body;
  
  // Verify the fixed password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect Password' });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id, 
      { title, content }, 
      { new: true } // Returns the updated document
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
}

export const deleteBlog = async (req: Request, res: Response) => {
  const { password } = req.body;
  
  // Verify the fixed password
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Incorrect Password' });
  }

  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
}
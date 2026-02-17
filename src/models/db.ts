import mongoose from "mongoose";

// MongoDB Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Stores Markdown
  createdAt: { type: Date, default: Date.now }
});
export const Blog = mongoose.model('Blog', blogSchema);
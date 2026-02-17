import express from "express";
import { 
    createBlog, 
    deleteBlog, 
    getAllBlogs, 
    updateBlog 
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", createBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export default router;
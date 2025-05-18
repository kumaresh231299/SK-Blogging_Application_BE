import express from "express";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../Controllers/blogController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router=express.Router();

router.get("/get-all-blogs",getAllBlogs);
router.post("/create-blog",protect,createBlog);
router.put("/:id",protect,updateBlog);
router.delete("/:id",protect,deleteBlog);

export default router;
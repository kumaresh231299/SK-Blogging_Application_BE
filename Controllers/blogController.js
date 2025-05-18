import Blog from "../Models/blogSchema.js";
import User from "../Models/userSchema.js";

export const getAllBlogs = async (req, res) => {
    try {
        const { category, author } = req.query;
        const query = {};
        if (category) query.category = category;
        if (author) query.author = author;

        const blogs = await Blog.find(query);
        res.status(200).json({message:"Your Blogs",blogs});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const createBlog = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { title, category, content, image } = req.body;

        const newBlog = await new Blog({
            title,
            category,
            content,
            image,
            userId: user._id,
            author: user.name,
        });
        await newBlog.save();
        res.status(201).json({ message: "New Blog Created", newBlog });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.log("Error : ",error)
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(404).json({error:"Blog not found"});
        }

        if (blog.userId.toString() !== req.user.id)
            return res.status(403).json({ error: "Unauthorized access" });

        //Update fields
        blog.title = req.body.title || blog.title;
        blog.category = req.body.category || blog.category;
        blog.content = req.body.content || blog.content;
        blog.image = req.body.image || blog.image;
        blog.updatedAt = new Date();

        await blog.save();

        res.status(200).json({ message: "Blog updated", blog })

    } catch (error) {
        res.status(500).json({ error: "Server error" })
        console.log("Update Blog Error : ",error);
        console.log("Request Body",req.body);
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (blog.userId.toString() !== req.user.id)
            return res.status(403).json({ error: "Unauthorized" });

        await blog.deleteOne();

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch(error) {
        res.status(500).json({ error: "Server error" })
        console.log("Delete Blog error : ",error);
    }
}
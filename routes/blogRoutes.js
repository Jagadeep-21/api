
const express=require("express");
const { newBlogPost,likeBlog } = require("../controllers/blogController");
const blogRouter=express.Router()

blogRouter.post("/:id",newBlogPost)
blogRouter.post("/like/:id",likeBlog)
module.exports=blogRouter
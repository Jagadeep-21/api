
const express=require("express");
const { newBlogPost } = require("../controllers/blogController");
const blogRouter=express.Router()

blogRouter.post("/:id",newBlogPost)
module.exports=blogRouter
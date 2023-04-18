
const express=require("express");
const { newBlogPost,likeBlog,pushComment, replyComment, searchByTag } = require("../controllers/blogController");
const blogRouter=express.Router()

blogRouter.get('/tag',searchByTag)

//POST methods
blogRouter.post("/:id",newBlogPost)
blogRouter.post("/like/:id",likeBlog)
blogRouter.post("/comment/:id",pushComment)
blogRouter.post("/comment/reply/:id",replyComment)

module.exports=blogRouter
const express=require('express')
const userRouter=express.Router();
const {signup,signin, follow, unfollow}=require("../controllers/userController")


//signup
userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.patch('/follow/:id',follow)
userRouter.patch('/unfollow/:id',unfollow)
module.exports =userRouter
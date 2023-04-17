const express=require('express')
const userRouter=express.Router();
const {signup,signin}=require("../controllers/userController")


//signup
userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
module.exports =userRouter
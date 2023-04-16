const express=require('express');
const router = require('./routes/getRoutes');
const dotenv=require('dotenv').config()
const app=express();
const port =process.env.PORT
const {getError}=require("./errorHandlers/getError");

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//mongodb connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected...."))
  .catch((e) => console.log(e.message));

app.use('/',router)
app.use(getError)   
console.log(port)
app.listen(port,()=>console.log(`listening on ${port}`))
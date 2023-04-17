const express = require("express");
const router = require("./routes/reviewRoutes");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;
const { getError } = require("./errorHandlers/getError");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongodb connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected...."))
  .catch((e) => console.log(e.message));
//file  upload
const userRouter = require("./routes/userRoutes");
const blogRouter=require("./routes/blogRoutes")
//storage




// app.post("/upload", (req, res) => {
//   upload(req, res, async(err) => {
//     if (err) {
//       throw new Error(err.message);
//     } else {
//       const newImage = await imageModel.create({
//         name: req.body.name,
//         file: {
//           data: req.file.filename,
//           contentType: req.file.mimetype,
//         },
//       }).then(()=>console.log("suucessfull")).catch((e) => res.json(e.message));
//       // newImage
//       //   .save()
//       //   .then(() => res.json({message:"uploaded successfully"}))
//       //   .catch((e) => res.json(e.message));
//     }
//   });
// });
app.use('/blog',blogRouter)
app.use('/user',userRouter)
app.use("/", router);
app.use(getError);
console.log(port);
app.listen(port, () => console.log(`listening on ${port}`));

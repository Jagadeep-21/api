const Blog = require("../models/blogModel");
const Users = require("../models/Usermodel");

const newBlogPost = async (req, res) => {
  const data = req.body;
  const authorId = req.params.id;
  const doc = await Users.findById(authorId);
  if (!doc) {
    throw new Error("only registered user would post");
  } else {
    //to prevent posting the same post by the same user
    const blogexist = await Blog.find({$and:[{author: authorId},{title: data.title}] });
    console.log(blogexist)
    if (blogexist.length===0) {
      await Blog.create({
        title: data.title,
        content: data.content,
        author: authorId,
      })
        .then((p) => {
          res.send("your post has been added");
          console.log(p._id);
        })
        .catch((e) => res.send(e.message));
      await Users.findOneAndUpdate(
        { _id: authorId },
        { $push: { Blogs: data.title } }
      );
    } else {
      res.send("you have posted already the same post ");
    }
    // console.log("searching ..")
    // console.log(blogid);
    // const doc=await Users.findOne({$filter:{$eq:})
  }
};
module.exports = {
  newBlogPost,
};
//after use

// await Blog.findOneAndUpdate().populate("author").then((p)=>console.log(p))
//for returnning the tit
// await Users.findByIdAndUpdate(authorId).populate("Blogs").then((p)=>console.log(p))
// console.log(p)

const mongoose = require("mongoose");
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
    const blogexist = await Blog.find({
      $and: [{ author: authorId }, { title: data.title }],
    });
    console.log(blogexist);
    if (blogexist.length === 0) {
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
const likeBlog = async (req, res) => {
  try {
    const userid = req.params.id;

    const user = await Users.findById(userid);
    if (!user) {
      return res.send("u should register first ");
    } else {
      const blogid = req.body.id;
      const ifLiked = await Blog.find({_id:blogid,likes:{$in:[userid]}})
      console.log(ifLiked);
      if (ifLiked.length===0) {
        await Blog.findByIdAndUpdate(blogid, { $push: { likes: userid } }).then(
          async () => {
            console.log("likes array updated");
            //get no of likes from blog
            const blog = await Blog.findById(blogid);
            const n = blog.noOfLikes;
            console.log(n);
            //increment
            await Blog.findByIdAndUpdate(blogid, { noOfLikes: n + 1 });
          }
        );
        res.send("liked the picture");
      } else {
        res.send("u cannot like more than once");
      }
    }
  } catch (e) {
    console.log("catch block");
    console.log(e.message);
  }
};
module.exports = {
  newBlogPost,
  likeBlog,
};
//after use

// await Blog.findOneAndUpdate().populate("author").then((p)=>console.log(p))
//for returnning the tit
// await Users.findByIdAndUpdate(authorId).populate("Blogs").then((p)=>console.log(p))
// console.log(p)

//like

// res.send(await Blog.findById(blogid,{$size:"likes"}))
// console.log(
//
// );
// const p = await Blog.aggregate([
//   { $match: { _id: blogid } },
//   { $project: { likes: 1, size_of_array: { $size: "$likes" } } },
//   {$group:{
//     "id":blogid,

//   }}
// ]);
// const p=await Blog.aggregate([{likes:{$count:"likes"}}])
// console.log(p);

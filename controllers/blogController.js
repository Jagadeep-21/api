const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const Users = require("../models/Usermodel");
const Comment = require("../models/commentModel");

const newBlogPost = async (req, res) => {
  try {
    const data = req.body;
    const tagArray = [ "final"];
    console.log(tagArray);
    const authorId = req.params.id;
    //only authorized person can post a blog
    const doc = await Users.findById(authorId);
    if (!doc) {
      throw new Error("only registered user would post");
    } else {
      //to prevent posting the same post by the same user
      const blogexist = await Blog.find({
        $and: [{ author: authorId }, { title: data.title }],
      });
      // console.log(blogexist);

      if (blogexist.length === 0) {
        await Blog.create({
          title: data.title,
          content: data.content,
          author: authorId,
        })
          .then(async (p) => {
            await Blog.findByIdAndUpdate(
              p._id,
              { $push: { tags: { $each: tagArray } } },
              { new: true }
            );
            res.send("your post has been added");
            console.log(p.tags);
          })
          .catch((e) => res.send(e.message));
        await Users.findOneAndUpdate(
          { _id: authorId },
          { $push: { Blogs: data.title } }
        );
      } else {
        res.send("you have posted already the same post ");
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
const likeBlog = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await Users.findById(userid);
    //prevent users from liking w/o registering
    if (!user) {
      return res.send("u should register first ");
    } else {
      const blogid = req.body.id;
      const ifLiked = await Blog.find({
        _id: blogid,
        likes: { $in: [userid] },
      });
      console.log(ifLiked);
      //prevent from liking the same picture again and again
      if (ifLiked.length === 0) {
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

const pushComment = async (req, res) => {
  // find blog and push comment
  try {
    const blogId = req.body.id;
    const userId = req.params.id;

    const user = await Users.findById(userId);

    if (!user) {
      res.send("registered user only can comment ");
    } else {
      const con = req.body.content;
      console.log(con.length);
      if (con.length > 0) {
        await Comment.create({
          content: con,
          userId: userId,
        }).then(async (p) => {
          // console.log(p)
          console.log("comment has been created");
          await Blog.updateOne(
            { _id: blogId },
            { $push: { comments: p._id } }
          ).then(() => res.send("ur response is added"));
        });
        const p = await Blog.findById(blogId).populate("comments");
        console.log(p);
      } else {
        res.send("enter some content to comment ");
      }
    }
  } catch (e) {
    res.send(e.message);
  }
};

const replyComment = async (req, res) => {
  const userId = req.params.id;
  // get the comment from post
  try {
    if (userId === req.body.replyId) {
      res.send("u cannot comment to your comment itself");
    } else {
      await Comment.create({
        userId: req.body.replyId,
        content: req.body.content,
      }).then(async (p) => {
        await Comment.findByIdAndUpdate(userId, {
          $push: { replyArray: p._id },
        }).then(() => res.send("comment pushed"));
      });
    }
  } catch (e) {
    res.send(e.message);
  }
  //find the user and upload the replyArray
};
const searchByTag = async (req, res) => {
  // const queryArray = ;
  // await Blog.find({ tags:["final", "csk"] })
  await Blog.find( { tags: {$in:["final", "csk"]} } )
    .then((p) => console.log(p))
    .catch((e) => console.log(e.message));
};
module.exports = {
  newBlogPost,
  likeBlog,
  pushComment,
  replyComment,
  searchByTag,
};
//afteruse of

// newPost

// await Blog.findOneAndUpdate().populate("author").then((p)=>console.log(p))
//for returnning the tit
// await Users.findByIdAndUpdate(authorId).populate("Blogs").then((p)=>console.log(p))
// console.log(p)
// console.log("searching ..")
// console.log(blogid);
// const doc=await Users.findOne({$filter:{$eq:})

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

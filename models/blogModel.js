const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    noOfLikes: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tags:[
        {type:String}
    ]
  },
  { Timestamps: true }
);
module.exports = Blog = mongoose.model("blogPost", BlogSchema);

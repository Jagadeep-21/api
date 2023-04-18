const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    userId:{
        type:mongoose.Types.ObjectId
    },
    replyArray:[
        {type:mongoose.Types.ObjectId}
    ]
  },
  {
    timestamps: true,
  }
);
module.exports=Comment=mongoose.model("Comment",commentSchema)

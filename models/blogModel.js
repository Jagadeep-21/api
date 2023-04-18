const mongoose=require("mongoose")
const BlogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,required:true
    },
    likes:[
       { type:mongoose.Schema.Types.ObjectId,ref:'Users'}
    ],
    author:
       { type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    noOfLikes:{
        type:Number,
        default:0
    }
    
},
{Timestamps:true})
module.exports=Blog=mongoose.model('blogPost',BlogSchema)
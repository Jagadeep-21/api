const mongoose=require("mongoose")
const reviewSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    review:{
        type:String
    }
},{
    timestamps:true
});
const Blog=mongoose.model('bqq',reviewSchema)
module.exports=Blog
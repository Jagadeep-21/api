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
const review=mongoose.model('review',reviewSchema)
module.exports=review
const mongoose=require("mongoose")
const ImageSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    file:{
        data:Buffer,
        contentType:String
    }
})
module.exports=Image=mongoose.model('images',ImageSchema)
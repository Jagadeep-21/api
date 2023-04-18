const mongoose=require('mongoose')
const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImage:{
        data:Buffer,
        contentType:String
    },
    mobileNo:{
        type:String,   
    },
    password:{
        type:String,
        required:true
    },
    Blogs:[
        {type:String}
    ],
    followers:[
        {type:mongoose.Schema.ObjectId,ref:"Users"}

    ],
    following:[
        {type:mongoose.Schema.ObjectId,ref:"Users"}
    ],
},{
    timestamps:true
})
module.exports=User=mongoose.model('Users',userSchema)
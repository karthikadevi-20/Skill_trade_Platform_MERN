const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileUrl:{
        type:String
    },
    skillsOffered:{
        type:Array
    },
    skillsNeeded:{
        type:Array
    },
    skillPoints:{
        type:Number,
        default:200
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User
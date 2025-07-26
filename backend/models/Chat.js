const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    message:[{
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        receiver:{type:mongoose.Schema.Types.ObjectId,ref:"User"}, // OPTIONAL
        content:String,
        timeStamp:{type:Date,default:Date.now}
    }]
})

module.exports=mongoose.model("Chat",chatSchema)
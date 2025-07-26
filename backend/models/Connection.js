const mongoose=require("mongoose");

const connectionSchema=new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    user1:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    user2:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Connection',connectionSchema)
const mongoose=require("mongoose")

const RequestSchema=new mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    skillsNeeded:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','completed'],
        default:'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Request=mongoose.model('Request',RequestSchema)
module.exports=Request
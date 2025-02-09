const mongoose=require("mongoose");

const SkillRequestSchema = new mongoose.Schema(
    {
        requester:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        recipient:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        skillRequested:{type:mongoose.Schema.Types.ObjectId,ref:"Skill",required:true},
        status:{type:String,enum:["Pending","Accepted","Rejected"],default:"Pending"},
        message:{type:String},
    },{timestamps:true}
);

module.exports=mongoose.model("SkillRequest",SkillRequestSchema);

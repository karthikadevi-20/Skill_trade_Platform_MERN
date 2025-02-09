const mongoose=require("mongoose");

const SkillSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    skillName:{type:String,required:true},
    category:{type:String},
    description:{type:String},
    createdAt:{type:Date,default:Date.now}
}
);

module.exports=mongoose.model("Skill",SkillSchema);
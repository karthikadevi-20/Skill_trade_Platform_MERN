const mongoose=require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    skillsOffered:[{type:String,default:[]}],
    skillsNeeded:[{type:String,default:[]}],
    bio:{type:String,default:""},
    rating:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
            rating: Number,
            review:String,
        },
    ],
    averageRating:{type:Number,default:0},
});

module.exports=mongoose.model("User",UserSchema);
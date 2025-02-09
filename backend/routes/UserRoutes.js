const express=require("express");
const router=express.Router();
const User=require("../models/UserModel")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/profile",authMiddleware,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({msg:"User not found"});
        res.json(user);
    }
    catch(err)
    {
        res.status(500).json({msg:err.message});
    }
});

router.put("/profile",authMiddleware,async(req,res)=>{
    try{
        const {name,skillsOffered,skillsNeeded,bio}=req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {name,skillsOffered,skillsNeeded,bio},
            {new:true}
        ).select("-password");
        res.json(updatedUser);
    }
    catch(err)
    {
        res.status(500).json({msg:err.message});
    }3
});

module.exports=router;
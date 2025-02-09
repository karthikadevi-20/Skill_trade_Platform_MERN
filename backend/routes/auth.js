const express=require("express");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const User=require("../models/UserModel");
const router=express.Router();

router.post("/signup",async (req,res)=>{
    try{
        const {name,email,password,skillsOffered,skillsNeeded} = req.body;
        
        let user=await User.findOne({email});
        if(user) return res.status(400).json({msg:"User already exists"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        user=new User({name,email,password:hashedPassword,skillsOffered,skillsNeeded});
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({token,user});
    }
    catch(err)
    {
        res.status(500).json({msg:err.message});
    }
});

router.post("/login", async (req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:"User not found"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({token,user});
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
});

module.exports=router;
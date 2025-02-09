const express=require("express");
const Skill=require("../models/SkillModel")
const authMiddleware=require("../middleware/authMiddleware")

const router=express.Router();

router.post("/",authMiddleware,async(req,res)=>{
    try{

        const {skillName,category,description}=req.body;
        const newskill=new Skill({
            user:req.user.id,
            skillName,
            category,
            description
        });
        await newskill.save();
        res.status(201).json(newskill);
    }
    catch(err)
    {
        res.status(500).json({msg:err.message});
    }
});

router.get("/",async(req,res)=>{
    try{
        const {search}=req.query;
        let query={};
        if(search){
            query={skillName:{$regex:search,$options:"i"}};
        }

        const skills=await Skill.find(query).populate("user","name");
        res.json(skills);
    }
    catch(err)
    {
        res.status(500).json({msg:err.message});
    }
});

module.exports=router;
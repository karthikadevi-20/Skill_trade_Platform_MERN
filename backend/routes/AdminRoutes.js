const express=require("express");
const router=express.Router();
const Admin=require("../models/Admin")

router.get("/all",async(req,res)=>{
    try{
        const fetchedAdmin=await Admin.find();
        res.status(200).json(fetchedAdmin);
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.post("/add",async(req,res)=>{
    try{
        const newAdmin=new Admin(req.body);
        const savedAdmin=await newAdmin.save();
        res.status(201).json(savedAdmin);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
})

router.put("/edit/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const currentRecord=await Admin.findOne({_id:id});
        if(!currentRecord)
        {
            res.status(404).json({message:"No record Found"})
        }
        const updatedAdmin=await Admin.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updatedAdmin)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const currentRecord=await Admin.findOne({_id:id});
        if(!currentRecord)
        {
            res.status(404).json({message:"No record Found"})
        }
        const DeletedAdmin=await Admin.findByIdAndDelete(id,req.body,{new:true})
        res.status(200).json(DeletedAdmin)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})
module.exports=router

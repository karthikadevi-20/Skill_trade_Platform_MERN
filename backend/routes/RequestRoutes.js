const express=require("express");
const router=express.Router();
const Request=require("../models/Request")
const User=require("../models/User")
router.get("/all",async(req,res)=>{
    try{
        const fetchedRequest=await Request.find();
        res.status(200).json(fetchedRequest);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
})

router.post("/add", async (req, res) => {
    try {
        const { createdBy, skillsNeeded } = req.body;

        // Step 1: Create and save the request
        const newRequest = new Request({ createdBy, skillsNeeded });
        const savedRequest = await newRequest.save();

        // Step 2: Append the skillsNeeded to user's skillsNeeded array without duplicates
        await User.findByIdAndUpdate(createdBy, {
            $addToSet: {
                skillsNeeded: { $each: skillsNeeded }
            }
        });

        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put("/edit/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const currentRequest=await Request.findOne({_id: id});
        if(!currentRequest)
        {
            return res.status(404).json({message:"Request not found"})
        }
        const updatedRequest= await Request.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedRequest);
    }
    catch(error)
    {
        res.status(500).json({message:"Request Updated"})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const currentRequest=await Request.findOne({_id: id});
        if(!currentRequest)
        {
            return res.status(404).json({message:"Request not found"})
        }
        const deletedRequest= await Request.findByIdAndDelete(id,req.body,{new:true});
        res.status(200).json(deletedRequest);
    }
    catch(error)
    {
        res.status(500).json({message:"Request Updated"})
    }
})

router.get("/request/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const userRequest=await Request.find({createdBy:id})
        res.status(200).json(userRequest)
    }
    catch(err)
    {
        console.error("Error fetching user requests: ",err.message);
        res.status(500).json({error:"Failed to fetch user Requests"});
        
    }
})

module.exports=router;
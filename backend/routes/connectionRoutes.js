const express=require("express");
const mongoose=require("mongoose")
const router=express.Router();
const Connection=require("../models/Connection")

router.post("/", async (req, res) => {
    let { user1, user2 } = req.body;
    console.log("Request Body of connect", req.body); // Log to see the incoming request

    try {
        // Ensure both user1 and user2 are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(user1) || !mongoose.Types.ObjectId.isValid(user2)) {
            return res.status(400).json({ error: "Invalid user IDs" });
        }

        user1 = new mongoose.Types.ObjectId(user1);
        user2 = new mongoose.Types.ObjectId(user2);

        // Check for missing IDs after conversion
        if (!user1 || !user2) {
            return res.status(400).json({ error: "Missing user IDs" });
        }

        const exists = await Connection.findOne({
            $or: [
                { user1, user2 },
                { user1: user2, user2: user1 }
            ]
        });

        if (exists) return res.status(400).json({ message: 'Connection already exists' });

        const newConnection = new Connection({ user1, user2 });
        await newConnection.save();
        res.status(201).json(newConnection);
    } catch (err) {
        console.error("Error creating connection:", err); // More detailed error logging
        res.status(500).json({ message: err.message });
    }
});
// Example Express endpoint
router.get("/connections/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const connections = await Connection.find({ participants: userId });
      res.json(connections);
    } catch (err) {
      res.status(500).json({ message: "Error fetching connections" });
    }
  });
  

module.exports=router
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const SkillRequest = require("../models/SkillRequestModel");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 Send a Skill Request
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { recipient, skillRequested, message } = req.body;

        if (!recipient || !skillRequested) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // ✅ Convert recipient & skillRequested to ObjectId
        if (!mongoose.Types.ObjectId.isValid(recipient) || !mongoose.Types.ObjectId.isValid(skillRequested)) {
            return res.status(400).json({ msg: "Invalid recipient or skill ID" });
        }

        const skillRequest = new SkillRequest({
            requester: req.user.id,
            recipient: new mongoose.Types.ObjectId(recipient),
            skillRequested: new mongoose.Types.ObjectId(skillRequested),
            message,
        });

        await skillRequest.save();
        res.status(201).json({ msg: "Skill request sent!", skillRequest });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// 📌 Get Skill Requests for Logged-in User
router.get("/requests", authMiddleware, async (req, res) => {
    try {
        const requests = await SkillRequest.find({ recipient: req.user.id })
            .populate("requester", "name email")
            .populate("skillRequested", "skillName"); // ✅ Fixed field name

        res.json(requests);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});
// 📌 Get a Specific Skill Request by ID
router.get("/requests/:requestId", authMiddleware, async (req, res) => {
    try {
        const skillRequest = await SkillRequest.findById(req.params.requestId)
            .populate("requester", "name email")
            .populate("skillRequested", "skillName");

        if (!skillRequest) {
            return res.status(404).json({ msg: "Skill request not found" });
        }

        if (skillRequest.recipient.toString() !== req.user.id && skillRequest.requester.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized to view this request" });
        }

        res.json(skillRequest);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// 📌 Accept or Reject a Skill Request
router.put("/:requestId", authMiddleware, async (req, res) => {  // ✅ Fixed Route Parameter
    try {
        const { status } = req.body;
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ msg: "Invalid Status" });
        }

        const skillRequest = await SkillRequest.findById(req.params.requestId);
        if (!skillRequest) {
            return res.status(404).json({ msg: "Request not found" });
        }

        if (skillRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        skillRequest.status = status;
        await skillRequest.save();
        res.json({ msg: `Request ${status.toLowerCase()}!`, skillRequest });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;

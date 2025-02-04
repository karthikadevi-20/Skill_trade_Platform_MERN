const express = require("express");
const router = express.Router();
const User = require("../models/Usermodel");
const authMiddleware = require("../middleware/authMiddleware");

// Add Rating to a User
router.post("/:userId/rate", authMiddleware, async (req, res) => {
    try {
        const { rating, review } = req.body;
        const ratedUser = await User.findById(req.params.userId);
        if (!ratedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        ratedUser.ratings.push({
            userId: req.user.id,
            rating,
            review
        });

        // Update average rating
        const totalRatings = ratedUser.ratings.length;
        const sumRatings = ratedUser.ratings.reduce((acc, r) => acc + r.rating, 0);
        ratedUser.averageRating = sumRatings / totalRatings;

        await ratedUser.save();
        res.json({ message: "Rating added successfully", user: ratedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Profile with Ratings
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("ratings.userId", "name");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

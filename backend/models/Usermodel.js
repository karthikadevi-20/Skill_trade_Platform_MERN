const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skillsOffered: { type: [String], required: true },
    skillsNeeded: { type: [String], required: true },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, min: 1, max: 5 },
            review: { type: String }
        }
    ],
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);

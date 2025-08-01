const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { StreamChat } = require("stream-chat");

// Initialize StreamChat instance
const serverClient = StreamChat.getInstance(
  "2m3av4b5nszy",
  "udk6svbhrtj62amd6jhzrg4kmma2hzkgnf2wjduq38cpepddba7xwstg4xetze4h"
);

// Route: Register
router.post("/register", async (req, res) => {
  const { username, email, password, skillsOffered, skillsNeeded } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      skillsOffered,
      skillsNeeded,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed", error: err.message });
  }
});

// Route: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = serverClient.createToken(user._id.toString());

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
});

module.exports = router;

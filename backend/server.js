require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 1010;
app.get("/", (req, res) => {
    res.status(201).json({ "message": "Welcome to the Skill Trade Platform Server" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

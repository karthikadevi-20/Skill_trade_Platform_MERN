require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const authRoutes=require("./routes/auth")
const user=require("./routes/userRoutes")
const skillRoutes=require("./routes/skillRoutes");
const skillRequestRoutes=require("./routes/skillRequestRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/user",user);
app.use("/api/skills",skillRoutes);
app.use("/api/skill-requests",skillRequestRoutes);

const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

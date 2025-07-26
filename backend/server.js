require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const db = require("./config/db");
const Chat = require("./models/Chat");
const Requests = require("./routes/RequestRoutes");
const Users = require("./routes/UserRoutes");
const Admins = require("./routes/AdminRoutes");
const authRoutes = require("./routes/authRoutes");
const ConnectionRoutes = require("./routes/connectionRoutes");
const ChatRoutes = require("./routes/chatRoutes");

const app = express();
const server = http.createServer(app); // wrap express in http server
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // frontend origin
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/requests", Requests);
app.use("/User", Users);
app.use("/Admin", Admins);
app.use("/connect", ConnectionRoutes);
app.use("/chat", ChatRoutes);

// WebSocket logic
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat room: ${chatId}`);
  });

  socket.on("send-message", async ({ chatId, message }) => {
    try {
      // Save the message to MongoDB
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            message: {
              sender: message.sender,
              content: message.content,
              timeStamp: message.timeStamp || new Date()
            }
          }
        },
        { new: true }
      );
  
      // Emit the message to all participants in the chat room
      io.to(chatId).emit("receive-message", message);
    } catch (err) {
      console.error("Error saving message to chat:", err);
    }
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express")
const router = express.Router();
const Chat = require("../models/Chat")

// backend: routes/chatRoutes.js
router.post("/", async (req, res) => {
  const { participants, user1, user2 } = req.body;

  try {
    const existingChat = await Chat.findOne({ participants: { $all: participants } });
    if (existingChat) return res.status(200).json(existingChat);

    const newChat = new Chat({ participants });
    await newChat.save();

    // Link chatId to connection
    await Connection.findOneAndUpdate(
      {
        $or: [
          { user1: user1, user2: user2 },
          { user1: user2, user2: user1 },
        ]
      },
      { chatId: newChat._id }
    );

    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("participants")
      .populate("message.sender");
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
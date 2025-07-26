import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../api/socket";
import { getUserById } from "../api/auth";

function ChatPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { id: chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    socket.emit("join-chat", chatId);

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receive-message");
  }, [chatId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const chatUsers = [...new Set(messages.map((msg) => msg.sender))];
      const userDetails = {};

      for (let userId of chatUsers) {
        try {
          const res = await getUserById(userId);
          userDetails[userId] = res.data;
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      }

      setUsers(userDetails);
    };

    fetchUsers();
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const message = {
      sender: currentUser._id,
      content: input,
      timeStamp: new Date(),
    };
    socket.emit("send-message", { chatId, message });
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow px-4 py-3 text-lg font-semibold">
        Chat Room
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.sender === currentUser._id;
          const username = users[msg.sender]?.username || "Unknown User";
          return (
            <div
              key={idx}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${
                  isCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="text-sm font-medium mb-1">{username}</div>
                <div>{msg.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg mr-2 outline-none focus:ring focus:ring-blue-300"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;

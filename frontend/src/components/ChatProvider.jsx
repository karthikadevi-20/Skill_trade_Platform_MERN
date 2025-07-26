import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/v2/css/index.css";

const apiKey = "2m3av4b5nszy";
const client = StreamChat.getInstance(apiKey);

const ChatProvider = ({ children }) => {
  const [chatReady, setChatReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    console.log("Stored user string:", storedUserStr);
    console.log("Token:", token);

    if (!storedUserStr || !token) {
      setError("Missing user or token in localStorage.");
      return;
    }

    const storedUser = JSON.parse(storedUserStr);

    if (!storedUser._id || !storedUser.username) {
      setError("Invalid user object in localStorage.");
      return;
    }

    // Avoid reconnecting if already connected to same user
    if (client.userID === storedUser._id) {
      setChatReady(true);
      return;
    }

    const user = {
      id: storedUser._id,
      name: storedUser.username,
      image:
        storedUser.profileUrl ||
        `https://getstream.io/random_svg/?id=${storedUser._id}&name=${storedUser.username}`,
    };

    const connect = async () => {
      try {
        console.log("Connecting user to Stream Chat with:", user, token);
        await client.connectUser(user, token);
        setChatReady(true);
      } catch (err) {
        console.error("Stream connect error:", err);
        setError("Failed to connect to chat: " + err.message);
      }
    };

    connect();

    return () => {
      console.log("Disconnecting Stream Chat user");
      client.disconnectUser();
    };
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!chatReady) return <div>Loading chat...</div>;

  return <Chat client={client} theme="messaging light">{children}</Chat>;
};

export default ChatProvider;

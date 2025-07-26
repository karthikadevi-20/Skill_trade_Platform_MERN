// ChatApp.jsx
import React, { useEffect, useState } from "react";
import {
  useChatContext,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";

const ChatApp = ({ channelId = "general" }) => {
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (!client || !channelId) {
          throw new Error("Missing Stream client or channel ID");
        }

        const chan = client.channel("messaging", channelId);
        await chan.watch();
        setChannel(chan);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [client, channelId]);

  if (loading) return <div>Loading chat...</div>;
  if (error) return <div>Error loading chat: {error}</div>;
  if (!channel) return <div>No channel found</div>;

  return (
    <Channel channel={channel}>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatApp;

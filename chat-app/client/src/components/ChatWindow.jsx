import React from "react";
import { useChat } from "../context/ChatContext.jsx";
import TopBar from "./TopBar.jsx";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatWindow = () => {
  const { currentRoom, messages, typing } = useChat();

  if (!currentRoom) {
    return (
      <div className="chat-window empty">
        <p>Select a room to start chatting.</p>
      </div>
    );
  }

  const typingUsers = Object.values(typing).some(Boolean);

  return (
    <div className="chat-window">
      <TopBar />
      <MessageList messages={messages} />
      {typingUsers && <div className="typing">Someone is typing...</div>}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;

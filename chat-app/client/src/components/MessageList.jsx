import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  return (
    <div className="message-list">
      {messages.map((m) => (
        <div
          key={m._id}
          className={`message ${m.senderId?._id === user?.id ? "me" : ""}`}
        >
          <div className="message-meta">
            <span className="message-author">{m.senderId?.name || "User"}</span>
            <span className="message-time">
              {new Date(m.createdAt).toLocaleTimeString()}
            </span>
          </div>
          {m.type === "text" && <div className="message-body">{m.content}</div>}
          {m.type === "image" && <img src={m.mediaUrl} alt="sent" />}
          {m.type === "file" && (
            <a href={m.mediaUrl} target="_blank" rel="noreferrer">
              Download file
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;

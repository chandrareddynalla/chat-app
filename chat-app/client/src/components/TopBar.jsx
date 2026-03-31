import React from "react";
import { useChat } from "../context/ChatContext.jsx";

const TopBar = () => {
  const { currentRoom } = useChat();

  return (
    <div className="topbar">
      <div className="title">{currentRoom ? currentRoom.name : "Select a room"}</div>
      <div className="muted">{currentRoom?.type || ""}</div>
    </div>
  );
};

export default TopBar;

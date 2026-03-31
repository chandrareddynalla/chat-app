import React from "react";
import { useChat } from "../context/ChatContext.jsx";

const UserList = () => {
  const { users, createDirect, user: currentUser } = useChat();

  const handleStartDirect = async (otherUser) => {
    await createDirect(otherUser._id);
  };

  const otherUsers = users.filter((u) => u._id !== currentUser?.id);

  if (!otherUsers.length) return null;

  return (
    <div className="room-list" style={{ marginTop: '0.5rem' }}>
      <div className="muted" style={{ fontSize: '0.85rem', fontWeight: 600, paddingLeft: '0.5rem', letterSpacing: '0.05em' }}>
        DIRECT MESSAGES
      </div>
      <div className="room-items">
        {otherUsers.map((u) => (
          <button
            key={u._id}
            className="room-item"
            onClick={() => handleStartDirect(u)}
          >
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: u.presence === 'online' ? '#4ade80' : '#52525b',
              marginRight: '8px'
            }}></span>
            {u.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;

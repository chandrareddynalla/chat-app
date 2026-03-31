import React from "react";
import RoomList from "./RoomList.jsx";
import UserList from "./UserList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div>
          <div className="title">Chats</div>
          <div className="muted" style={{ fontSize: '0.85rem' }}>{user?.email}</div>
        </div>
        <button className="btn-link" onClick={logout}>Logout</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, overflowY: 'auto' }}>
        <RoomList />
        <UserList />
      </div>
    </aside>
  );
};

export default Sidebar;

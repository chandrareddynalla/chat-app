import React, { useState } from "react";
import { useChat } from "../context/ChatContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const RoomList = () => {
  const { rooms, currentRoom, selectRoom, createRoom, joinRoom } = useChat();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // For joining an existing room
  const [joinName, setJoinName] = useState("");
  const [joinPass, setJoinPass] = useState("");

  // Show only rooms that are NOT direct and that the user created
  const displayedRooms = rooms.filter(
    (r) => r.type !== "direct" && r.createdBy === user?._id
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createRoom(name.trim(), isPrivate ? "private" : "public", password);
    setName("");
    setPassword("");
    setIsPrivate(false);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!joinName.trim()) return;
    if (!joinPass.trim()) {
      alert('Password is required for private rooms');
      return;
    }
    try {
      await joinRoom(joinName.trim(), joinPass);
      setJoinName("");
      setJoinPass("");
    } catch (err) {
      // err.message may contain server response message
      alert(err.message || 'Failed to join room. Check name/password.');
    }
  };

  return (
    <div className="room-list">
      <h3>Create Room</h3>
      <form onSubmit={handleCreate} className="room-create">
        <input
          type="text"
          placeholder="Room name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          Private Room?
        </label>
        {isPrivate && (
          <input
            type="password"
            placeholder="Room Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
        <button type="submit" className="btn-primary">Create</button>
      </form>

      <hr />

      <h3>Join Room</h3>
      <form onSubmit={handleJoin} className="room-create">
        <input
          type="text"
          placeholder="Room name"
          value={joinName}
          onChange={(e) => setJoinName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (if private)"
          value={joinPass}
          onChange={(e) => setJoinPass(e.target.value)}
        />
        <button type="submit" className="btn-primary">Join</button>
      </form>

      <hr />

      <h3>Your Rooms</h3>
      <div className="room-items">
        {displayedRooms.map((room) => (
          <button
            key={room._id}
            className={`room-item ${currentRoom?._id === room._id ? "active" : ""}`}
            onClick={() => selectRoom(room)}
          >
            {room.type === "private" ? "🔒" : ""} {room.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomList;

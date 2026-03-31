import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { request } from "../api/http.js";
import { useSocket } from "../hooks/useSocket.js";
import { useAuth } from "./AuthContext.jsx";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { token, user } = useAuth();
  const socket = useSocket(token);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      if (!token) return;
      const data = await request("/api/rooms", { token });
      setRooms(data.rooms || []);
      if (data.rooms?.length) setCurrentRoom(data.rooms[0]);
    };
    loadRooms();

    const loadUsers = async () => {
      if (!token) return;
      const data = await request("/api/users", { token });
      setUsers(data.users || []);
    };
    loadUsers();
  }, [token]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!token || !currentRoom) return;
      
      if (socket) {
        socket.emit("joinRoom", { roomId: currentRoom._id });
      }

      const data = await request(`/api/messages/${currentRoom._id}`, { token });
      setMessages(data.messages || []);
    };
    loadMessages();
  }, [token, currentRoom, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      if (String(message.roomId) !== String(currentRoom?._id)) return;
      setMessages((prev) => [...prev, message]);
    });

    socket.on("userTyping", ({ userId, roomId, isTyping }) => {
      if (roomId !== currentRoom?._id) return;
      setTyping((prev) => ({ ...prev, [userId]: isTyping }));
    });

    socket.on("messageRead", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, status: "read" } : m))
      );
    });

    return () => {
      socket.off("newMessage");
      socket.off("userTyping");
      socket.off("messageRead");
    };
  }, [socket, currentRoom]);

  const selectRoom = (room) => {
    setCurrentRoom(room);
  };

  const createRoom = async (name, type = "public", password = "") => {
    const data = await request("/api/rooms", {
      method: "POST",
      body: { name, type, password },
      token
    });
    setRooms((prev) => [data.room, ...prev]);
    setCurrentRoom(data.room);
  };

  const joinRoom = async (name, password = "") => {
    const data = await request("/api/rooms/join", {
      method: "POST",
      body: { name, password },
      token
    });
    // Add the room to the list if it wasn't there already
    setRooms((prev) => {
      if (prev.find((r) => r._id === data.room._id)) return prev;
      return [data.room, ...prev];
    });
    // IMPORTANT: set the newly joined room as the current active room
    setCurrentRoom(data.room);
  };

  const createDirect = async (otherUserId) => {
    const data = await request("/api/rooms/direct", {
      method: "POST",
      body: { otherUserId },
      token
    });
    setRooms((prev) => [data.room, ...prev.filter((r) => r._id !== data.room._id)]);
    setCurrentRoom(data.room);
  };

  const sendMessage = async ({ content, type = "text", mediaUrl }) => {
    if (!socket || !currentRoom) return;

    socket.emit(
      "sendMessage",
      { roomId: currentRoom._id, content, type, mediaUrl },
      () => {}
    );
  };

  const sendTyping = (isTyping) => {
    if (!socket || !currentRoom) return;
    socket.emit("typing", { roomId: currentRoom._id, isTyping });
  };

  const value = useMemo(
    () => ({
      rooms,
      currentRoom,
      messages,
      typing,
      selectRoom,
      createRoom,
      joinRoom,
      createDirect,
      sendMessage,
      sendTyping,
      user,
      users
    }),
    [rooms, currentRoom, messages, typing, user, users]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);

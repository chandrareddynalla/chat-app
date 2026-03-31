import jwt from "jsonwebtoken";
import { Room } from "../models/Room.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

export const initSockets = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.user.id;

    await User.findByIdAndUpdate(userId, { presence: "online", lastSeen: new Date() });

    const rooms = await Room.find({ members: userId });
    rooms.forEach((room) => socket.join(room._id.toString()));

    io.emit("presenceUpdate", { userId, presence: "online" });

    socket.on("joinRoom", async ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(roomId);
    });

    socket.on("typing", ({ roomId, isTyping }) => {
      socket.to(roomId).emit("userTyping", { userId, roomId, isTyping });
    });

    socket.on("sendMessage", async (payload, cb) => {
      try {
        const { roomId, content, type = "text", mediaUrl } = payload;
        const message = await Message.create({
          roomId,
          senderId: userId,
          content,
          type,
          mediaUrl,
          status: "sent"
        });

        const populated = await message.populate("senderId", "name email avatar");

        io.to(roomId).emit("newMessage", populated);
        if (cb) cb({ ok: true, message: populated });
      } catch (err) {
        console.error("Socket sendMessage Error:", err);
        if (cb) cb({ ok: false, error: "Failed to send" });
      }
    });

    socket.on("readMessage", async ({ messageId, roomId }) => {
      const updated = await Message.findByIdAndUpdate(
        messageId,
        { status: "read" },
        { new: true }
      );
      if (updated) {
        io.to(roomId).emit("messageRead", { messageId, roomId });
      }
    });

    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(userId, { presence: "offline", lastSeen: new Date() });
      io.emit("presenceUpdate", { userId, presence: "offline" });
    });
  });
};

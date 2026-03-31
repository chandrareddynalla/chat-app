import { Room } from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  try {
    const { name, type = "public", password } = req.body;
    if (!name) return res.status(400).json({ message: "Room name required" });

    const room = await Room.create({
      name,
      type,
      password: type === "private" ? password : null,
      members: [req.user.id],
      createdBy: req.user.id
    });

    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
};

export const listRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ members: req.user.id }).sort({ updatedAt: -1 });
    res.json({ rooms });
  } catch (err) {
    next(err);
  }
};

export const createDirect = async (req, res, next) => {
  try {
    const { otherUserId } = req.body;
    if (!otherUserId) return res.status(400).json({ message: "otherUserId required" });

    const existing = await Room.findOne({
      type: "direct",
      members: { $all: [req.user.id, otherUserId] }
    });

    if (existing) return res.json({ room: existing });

    const room = await Room.create({
      name: "Direct",
      type: "direct",
      members: [req.user.id, otherUserId],
      createdBy: req.user.id
    });

    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
};

export const joinRoom = async (req, res, next) => {
  try {
    const { name, password = "" } = req.body;
    if (!name) return res.status(400).json({ message: "Room name is required" });

    const room = await Room.findOne({ name });
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Trim password to avoid whitespace mismatches
    const suppliedPassword = password?.trim();
    if (room.type === "private" && room.password !== suppliedPassword) {
      return res.status(401).json({ message: "Invalid room password" });
    }

    if (!room.members.includes(req.user.id)) {
      room.members.push(req.user.id);
      await room.save();
    }

    res.json({ room });
  } catch (err) {
    next(err);
  }
};

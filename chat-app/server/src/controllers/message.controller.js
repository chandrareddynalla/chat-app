import { Message } from "../models/Message.js";

export const getMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { limit = 50, before } = req.query;

    const query = { roomId };
    if (before) query.createdAt = { $lt: new Date(before) };

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate("senderId", "name email avatar");

    res.json({ messages: messages.reverse() });
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message });
  } catch (err) {
    next(err);
  }
};

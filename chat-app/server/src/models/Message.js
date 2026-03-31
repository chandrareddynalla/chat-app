import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
    mediaUrl: { type: String },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" }
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

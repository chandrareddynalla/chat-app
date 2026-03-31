import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String },
    status: { type: String, default: "Available" },
    lastSeen: { type: Date, default: Date.now },
    presence: { type: String, enum: ["online", "offline"], default: "offline" }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors({ origin: "*", credentials: false })); // Allow all for dev
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;

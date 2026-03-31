import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDb } from "./config/db.js";
import { initSockets } from "./sockets/index.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDb(process.env.MONGO_URI);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  initSockets(io);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

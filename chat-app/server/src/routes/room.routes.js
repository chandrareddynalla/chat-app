import { Router } from "express";
import { createRoom, listRooms, createDirect, joinRoom } from "../controllers/room.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, listRooms);
router.post("/", requireAuth, createRoom);
router.post("/join", requireAuth, joinRoom);
router.post("/direct", requireAuth, createDirect);

export default router;

import { Router } from "express";
import { getMessages, markRead } from "../controllers/message.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/:roomId", requireAuth, getMessages);
router.patch("/read/:messageId", requireAuth, markRead);

export default router;

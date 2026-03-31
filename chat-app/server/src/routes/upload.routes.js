import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadFile } from "../controllers/upload.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

router.post("/", requireAuth, upload.single("file"), uploadFile);

export default router;

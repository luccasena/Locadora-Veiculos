import { Router } from "express";
import { ragController } from "../controllers/ragController";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), ragController.responseRag);

export default router;
import { Router } from "express";
import multer from "multer";
import { ImageController } from "@/controllers/image.controller";
import { HealthController } from "@/controllers/health.controller";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), ImageController.upload);
router.get("/health", HealthController.check);

export { router };

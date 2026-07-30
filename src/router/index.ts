import { Router } from "express";
import multer from "multer";
import { ImageController } from "@/controllers/image.controller";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), ImageController.upload);

export { router };

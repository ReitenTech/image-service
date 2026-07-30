import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { logger } from "@/core";
import { ImageService } from "@/services/image.service";

interface UploadResponse {
  success: boolean;
  message?: string;
  fileName?: string;
  error?: string;
}

export class ImageController {
  static async upload(
    req: Request,
    res: Response<UploadResponse>,
  ): Promise<void> {
    const clientIp = req.ip || req.headers["x-forwarded-for"] || "Unknown IP";
    const userAgent = req.headers["user-agent"] || "Unknown Device";

    try {
      const file = req.file;

      if (!file) {
        logger.warn({ clientIp, userAgent }, "Upload attempt failed: No file");
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, error: "File not provided" });
        return;
      }

      logger.info(
        { clientIp, userAgent, mimeType: file.mimetype, size: file.size },
        "Starting file upload...",
      );

      const fileName = await ImageService.uploadImage(
        file.buffer,
        file.originalname,
        file.mimetype,
      );

      logger.info(
        { fileName, clientIp, userAgent },
        "File successfully uploaded",
      );
      res.status(httpStatus.OK).json({
        success: true,
        message: "Image uploaded successfully",
        fileName: fileName,
      });
    } catch (error) {
      logger.error({ err: error, clientIp, userAgent }, "Upload error");
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Internal server error during upload",
      });
    }
  }
}

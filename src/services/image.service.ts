import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/core";

export class ImageService {
  static async uploadImage(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
  ): Promise<string> {
    const fileName = `${Date.now()}-${originalName}`;

    const uploadParams = {
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return fileName;
  }
}

import { HeadBucketCommand } from '@aws-sdk/client-s3';
import { logger, s3Client } from "@/core"; 

const bucketName = process.env.R2_BUCKET_NAME || 'images-bucket';

export class HealthService {
  static async getHealthData() {
    let storageStatus: 'up' | 'down' = 'down';
    let isHealthy = false;

    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
      storageStatus = 'up';
      isHealthy = true;
    } catch (error) {
      logger.error(
        { err: error, bucket: bucketName },
        "Cloudflare R2 bucket health check failed"
      );
      storageStatus = 'down';
      isHealthy = false;
    }

    return {
      status: isHealthy ? 'ok' : 'error',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      services: {
        storage: storageStatus,
      },
    };
  }
};
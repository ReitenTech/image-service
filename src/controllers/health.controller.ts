import { Request, Response } from 'express';
import { logger } from "@/core";
import { HealthService } from '@/services/health.service';

export interface HealthResponse {
  status: 'ok' | 'error';
  uptime?: number;
  timestamp: string;
  version?: string;
  message?: string;
  services?: {
    storage: 'up' | 'down';
  };
}

export interface IHealthService {
  getHealthData(): Promise<HealthResponse>;
}

export class HealthController {
  public static check = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await HealthService.getHealthData();
      
      if (data.status === 'error') {
        logger.warn({ storageStatus: data.services?.storage }, "Health check failed: R2 storage is unavailable");
        res.status(503).json(data);
        return;
      }
      
      res.status(200).json(data);
    } catch (error) {
      logger.error({ err: error }, "Critical error during health check execution");
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Internal Health Check Failure'
      });
    }
  };
}
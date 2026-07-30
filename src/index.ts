import { app } from "@/app";
import { logger } from "@/core";

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(port, () => {
  logger.info(`Upload service is running on http://localhost:${port}`);
});

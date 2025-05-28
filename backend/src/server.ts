import { app } from "./app";
import { AppDataSource } from "@/config/database";
import { env } from "@/config/env";
import { logger } from "@/utils/logger.util";

async function startServer() {
  try {
    await AppDataSource.initialize();
    logger.info("Database connection established");

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(
        `Health check: http://localhost:${env.PORT}${env.API_PREFIX}/health`,
      );
    });

    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE") {
        logger.error(
          `Port ${env.PORT} is already in use. Please use a different port.`,
        );
      } else {
        logger.error("Server encountered an error:", err);
      }
      AppDataSource.destroy().finally(() => {
        process.exit(1);
      });
    });
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received, shutting down gracefully");
      server.close(() => {
        logger.info("Process terminated");
        AppDataSource.destroy().then(() => {
          process.exit(0);
        });
      });
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT received, shutting down gracefully");
      server.close(() => {
        logger.info("Process terminated");
        AppDataSource.destroy().then(() => {
          process.exit(0);
        });
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();

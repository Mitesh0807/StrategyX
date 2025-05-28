import "reflect-metadata";
import express from "express";
import { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { env } from "@/config/env";
import { apiRoutes } from "@/routes";
import { generalLimiter } from "@/middleware/rateLimiting.middleware";
import { errorMiddleware } from "@/middleware/error.middleware";
import { logger } from "@/utils/logger.util";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: env.ALLOWED_ORIGINS.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

app.use(generalLimiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser(env.COOKIE_SECRET));

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.warn(message.trim()) },
  }),
);

logger.warn("Registering routes under prefix:", env.API_PREFIX);
app.use(env.API_PREFIX, apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

app.use(errorMiddleware);

export { app };

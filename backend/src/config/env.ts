import dotenv from "dotenv";
import { cleanEnv, str, num, bool } from "envalid";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const rawEnv = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  PORT: num({ default: 3001 }),
  API_PREFIX: str({ default: "/api/v1" }),

  DB_TYPE: str({ default: "postgres" }),
  DB_HOST: str({ default: "localhost" }),
  DB_PORT: num({ default: 5432 }),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  DB_SYNCHRONIZE: bool({ default: false }),
  DB_LOGGING: bool({ default: true }),

  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "7d" }),
  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_EXPIRES_IN: str({ default: "30d" }),

  COOKIE_SECRET: str(),

  ALLOWED_ORIGINS: str({ default: "http://localhost:3000" }),

  RATE_LIMIT_WINDOW_MS: num({ default: 900000 }),
  RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  AUTH_RATE_LIMIT_MAX: num({ default: 5 }),

  LOG_LEVEL: str({ default: "info" }),
  LOG_FILE: str({ default: "logs/app.log" }),
});

export const env = {
  ...rawEnv,
  //TODO:tempory fix need find correct way to enforce it
  JWT_EXPIRES_IN: rawEnv.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  JWT_REFRESH_EXPIRES_IN:
    rawEnv.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
};

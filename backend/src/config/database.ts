import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../entities/User.entity";
import { Product } from "../entities/Product.entity";

export const AppDataSource = new DataSource({
  type: env.DB_TYPE as any,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: env.DB_SYNCHRONIZE,
  logging: env.DB_LOGGING,
  entities: [User, Product],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
});

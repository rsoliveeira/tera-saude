import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = new Sequelize(
  process.env.DB_NAME || "terasaude",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export default database;
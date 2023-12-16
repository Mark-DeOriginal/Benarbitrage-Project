import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  if (process.env.MYSQL_PRIVATE_URL) {
    return new Sequelize(process.env.MYSQL_PRIVATE_URL, {
      dialect: process.env.DB_DIALECT, // Optional if specified in the URL
    });
  } else {
    return new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
      }
    );
  }
};

export default db();

import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
};

import pg from "pg";
import config from "./config.js";

const { Pool } = pg;

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("Database connected successfully");

    client.release();
  } catch (error) {
    console.error("Postgres connection failed:", error.message);
  }
};

export { pool, connectDB };

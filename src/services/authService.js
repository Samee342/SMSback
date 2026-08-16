import { pool } from "../config/database.js";
import bcrypt from "bcrypt";
// Register
const register = async (data) => {
  const { firstName, lastName, email, password, phone, photoUrl, role } = data;

  // Check if user already exists
  const existingUser = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw {
      statusCode: 400,
      message: "User already exists",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const result = await pool.query(
    `INSERT INTO users
    (
      first_name,
      last_name,
      email,
      password,
      phone,
      photo_url,
      role
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      id,
      first_name,
      last_name,
      email,
      phone,
      photo_url,
      role`,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      phone,
      photoUrl,
      role || "STUDENT",
    ],
  );

  const user = result.rows[0];

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    photoUrl: user.photo_url,
    role: user.role,
  };
};

// Login
const login = async (data) => {
  const { email, password } = data;

  const result = await pool.query(
    `SELECT
      id,
      first_name,
      last_name,
      email,
      password,
      phone,
      photo_url,
      role
    FROM users
    WHERE email = $1`,
    [email],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 400,
      message: "Incorrect email or password",
    };
  }

  const user = result.rows[0];

  // Compare password
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    throw {
      statusCode: 400,
      message: "Incorrect email or password",
    };
  }

  // Don't return password
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    photoUrl: user.photo_url,
    role: user.role,
  };
};

// Logout
const logout = async () => {
  return {
    message: "Logout successful",
  };
};

export { register, login, logout };

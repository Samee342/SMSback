import { pool } from "../config/database.js";
import bcrypt from "bcrypt";
// Register
const register = async (data) => {
  const { firstName, lastName, email, password, phone, photoUrl } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Check if user already exists
    const existingUser = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw {
        statusCode: 400,
        message: "User already exists",
      };
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const result = await client.query(
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
      [firstName, lastName, email, hashedPassword, phone, photoUrl, "STUDENT"],
    );

    const user = result.rows[0];

    // 4. Automatically create student profile
    await client.query(
      `INSERT INTO students (user_id)
       VALUES ($1)`,
      [user.id],
    );

    // 5. Commit everything
    await client.query("COMMIT");

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      photoUrl: user.photo_url,
      role: user.role,
    };
  } catch (error) {
    // 6. Rollback if anything fails
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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

import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

// Create User
const createUser = async (data) => {
  const { firstName, lastName, email, password, phone, photoUrl, role } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

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
    RETURNING id, first_name, last_name, email, phone, photo_url, role`,
    [firstName, lastName, email, hashedPassword, phone, photoUrl, role],
  );

  return result.rows[0];
};

// Get All Users
const getUsers = async () => {
  const result = await pool.query(
    `SELECT
      id,
      first_name,
      last_name,
      email,
      phone,
      photo_url,
      role
    FROM users
    ORDER BY id DESC`,
  );

  return result.rows;
};

// Get User By ID
const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT
      id,
      first_name,
      last_name,
      email,
      phone,
      photo_url,
      role
    FROM users
    WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

// Update User
const updateUser = async (id, data) => {
  const { firstName, lastName, email, phone, photoUrl, role } = data;

  const result = await pool.query(
    `UPDATE users
     SET
       first_name = $1,
       last_name = $2,
       email = $3,
       phone = $4,
       photo_url = $5,
       role = $6
     WHERE id = $7
     RETURNING
       id,
       first_name,
       last_name,
       email,
       phone,
       photo_url,
       role`,
    [firstName, lastName, email, phone, photoUrl, role, id],
  );

  return result.rows[0];
};

// Delete User
const deleteUser = async (id) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING
       id,
       first_name,
       last_name,
       email,
       phone,
       photo_url,
       role`,
    [id],
  );

  return result.rows[0];
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };

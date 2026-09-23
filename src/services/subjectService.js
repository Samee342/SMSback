import { pool } from "../config/database.js";

// ========================================
// CREATE SUBJECT
// ========================================

const createSubject = async (data) => {
  const { name, description } = data;

  // Check if subject already exists
  const existingSubject = await pool.query(
    `SELECT id FROM subjects WHERE name = $1`,
    [name],
  );

  if (existingSubject.rows.length > 0) {
    throw {
      statusCode: 400,
      message: "Subject already exists",
    };
  }

  const result = await pool.query(
    `INSERT INTO subjects (name, description)
     VALUES ($1, $2)
     RETURNING id, name, description, created_at, updated_at`,
    [name, description],
  );

  return result.rows[0];
};

// ========================================
// GET ALL SUBJECTS
// ========================================

const getAllSubjects = async () => {
  const result = await pool.query(
    `SELECT id, name, description, created_at, updated_at
     FROM subjects
     ORDER BY id ASC`,
  );

  return result.rows;
};

// ========================================
// GET SUBJECT BY ID
// ========================================

const getSubjectById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, description, created_at, updated_at
     FROM subjects
     WHERE id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Subject not found",
    };
  }

  return result.rows[0];
};

// ========================================
// UPDATE SUBJECT
// ========================================

const updateSubject = async (id, data) => {
  const { name, description } = data;

  // Check subject exists
  const existingSubject = await pool.query(
    `SELECT id FROM subjects WHERE id = $1`,
    [id],
  );

  if (existingSubject.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Subject not found",
    };
  }

  // If name is being changed, check duplicate name
  if (name) {
    const duplicateSubject = await pool.query(
      `SELECT id
       FROM subjects
       WHERE name = $1 AND id != $2`,
      [name, id],
    );

    if (duplicateSubject.rows.length > 0) {
      throw {
        statusCode: 400,
        message: "Subject already exists",
      };
    }
  }

  const result = await pool.query(
    `UPDATE subjects
     SET
       name = COALESCE($1, name),
       description = COALESCE($2, description),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, name, description, created_at, updated_at`,
    [name, description, id],
  );

  return result.rows[0];
};

// ========================================
// DELETE SUBJECT
// ========================================

const deleteSubject = async (id) => {
  const result = await pool.query(
    `DELETE FROM subjects
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Subject not found",
    };
  }

  return {
    message: "Subject deleted successfully",
  };
};

export {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};

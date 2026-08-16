import { pool } from "../config/database.js";

const createStudent = async (data) => {
  const {
    userId,
    dateOfBirth,
    admissionDate,
    address,
    gender,
    guardianName,
    guardianPhone,
  } = data;

  const result = await pool.query(
    `INSERT INTO students
    (
      user_id,
      date_of_birth,
      admission_date,
      address,
      gender,
      guardian_name,
      guardian_phone
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      userId,
      dateOfBirth,
      admissionDate,
      address,
      gender,
      guardianName,
      guardianPhone,
    ],
  );

  return result.rows[0];
};

const getStudents = async () => {
  const result = await pool.query(
    `SELECT
      students.*,
      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url
    FROM students
    JOIN users ON students.user_id = users.id
    ORDER BY students.id DESC`,
  );

  return result.rows;
};

const getStudentById = async (id) => {
  const result = await pool.query(
    `SELECT
      students.*,
      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url
    FROM students
    JOIN users ON students.user_id = users.id
    WHERE students.id = $1`,
    [id],
  );

  return result.rows[0];
};

const updateStudent = async (id, data) => {
  const {
    dateOfBirth,
    admissionDate,
    address,
    gender,
    guardianName,
    guardianPhone,
  } = data;

  const result = await pool.query(
    `UPDATE students
     SET
       date_of_birth = $1,
       admission_date = $2,
       address = $3,
       gender = $4,
       guardian_name = $5,
       guardian_phone = $6
     WHERE id = $7
     RETURNING *`,
    [
      dateOfBirth,
      admissionDate,
      address,
      gender,
      guardianName,
      guardianPhone,
      id,
    ],
  );

  return result.rows[0];
};

const deleteStudent = async (id) => {
  const result = await pool.query(
    `DELETE FROM students
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};

export {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

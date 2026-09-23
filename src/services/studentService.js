import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

// ========================================
// CREATE STUDENT
// ========================================

const createStudent = async (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    photoUrl,
    dateOfBirth,
    admissionDate,
    address,
    gender,
    guardianName,
    guardianPhone,
    sectionId,
  } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ========================================
    // CHECK SECTION
    // ========================================

    if (sectionId) {
      const sectionResult = await client.query(
        `SELECT id FROM sections WHERE id = $1`,
        [sectionId],
      );

      if (sectionResult.rows.length === 0) {
        throw {
          statusCode: 404,
          message: "Section not found",
        };
      }
    }

    // ========================================
    // CHECK EMAIL
    // ========================================

    const existingUser = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      [email],
    );

    if (existingUser.rows.length > 0) {
      throw {
        statusCode: 400,
        message: "Email already exists",
      };
    }

    // ========================================
    // HASH PASSWORD
    // ========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ========================================
    // CREATE USER
    // ========================================

    const userResult = await client.query(
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
      RETURNING id`,
      [firstName, lastName, email, hashedPassword, phone, photoUrl, "STUDENT"],
    );

    const userId = userResult.rows[0].id;

    // ========================================
    // CREATE STUDENT
    // ========================================

    const studentResult = await client.query(
      `INSERT INTO students
      (
        user_id,
        date_of_birth,
        admission_date,
        address,
        gender,
        guardian_name,
        guardian_phone,
        section_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        userId,
        dateOfBirth,
        admissionDate,
        address,
        gender,
        guardianName,
        guardianPhone,
        sectionId || null,
      ],
    );

    // ========================================
    // COMMIT
    // ========================================

    await client.query("COMMIT");

    return studentResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// ========================================
// GET ALL STUDENTS
// ========================================

const getStudents = async () => {
  const result = await pool.query(
    `SELECT 
      students.*,

      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url,

      sections.name AS section_name,

      classes.id AS class_id,
      classes.name AS class_name

    FROM students

    JOIN users
      ON students.user_id = users.id

    LEFT JOIN sections
      ON students.section_id = sections.id

    LEFT JOIN classes
      ON sections.class_id = classes.id

    ORDER BY students.id DESC`,
  );

  return result.rows;
};

// ========================================
// GET STUDENT BY ID
// ========================================

const getStudentById = async (id) => {
  const result = await pool.query(
    `SELECT 
      students.*,

      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url,

      sections.name AS section_name,

      classes.id AS class_id,
      classes.name AS class_name

    FROM students

    JOIN users
      ON students.user_id = users.id

    LEFT JOIN sections
      ON students.section_id = sections.id

    LEFT JOIN classes
      ON sections.class_id = classes.id

    WHERE students.id = $1`,
    [id],
  );

  return result.rows[0];
};

// ========================================
// UPDATE STUDENT
// ========================================

const updateStudent = async (id, data) => {
  const {
    dateOfBirth,
    admissionDate,
    address,
    gender,
    guardianName,
    guardianPhone,
    sectionId,
  } = data;

  // Check section if provided
  if (sectionId) {
    const sectionResult = await pool.query(
      `SELECT id FROM sections WHERE id = $1`,
      [sectionId],
    );

    if (sectionResult.rows.length === 0) {
      throw {
        statusCode: 404,
        message: "Section not found",
      };
    }
  }

  const result = await pool.query(
    `UPDATE students
     SET
       date_of_birth = $1,
       admission_date = $2,
       address = $3,
       gender = $4,
       guardian_name = $5,
       guardian_phone = $6,
       section_id = $7,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $8
     RETURNING *`,
    [
      dateOfBirth,
      admissionDate,
      address,
      gender,
      guardianName,
      guardianPhone,
      sectionId || null,
      id,
    ],
  );

  return result.rows[0];
};

// ========================================
// DELETE STUDENT
// ========================================

const deleteStudent = async (id) => {
  const result = await pool.query(
    `DELETE FROM students
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};

// ========================================
// EXPORT
// ========================================

export {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

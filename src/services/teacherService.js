import { pool } from "../config/database.js";

const createTeacher = async (data) => {
  const { userId, qualification, department, joiningDate, address, gender } =
    data;

  const result = await pool.query(
    `INSERT INTO teachers
    (
      user_id,
      qualification,
      department,
      joining_date,
      address,
      gender
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [userId, qualification, department, joiningDate, address, gender],
  );

  return result.rows[0];
};

const getTeachers = async () => {
  const result = await pool.query(
    `SELECT
      teachers.*,
      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url
    FROM teachers
    JOIN users ON teachers.user_id = users.id
    ORDER BY teachers.id DESC`,
  );

  return result.rows;
};

const getTeacherById = async (id) => {
  const result = await pool.query(
    `SELECT
      teachers.*,
      users.first_name,
      users.last_name,
      users.email,
      users.phone,
      users.photo_url
    FROM teachers
    JOIN users ON teachers.user_id = users.id
    WHERE teachers.id = $1`,
    [id],
  );

  return result.rows[0];
};

const updateTeacher = async (id, data) => {
  const { qualification, department, joiningDate, address, gender } = data;

  const result = await pool.query(
    `UPDATE teachers
     SET
       qualification = $1,
       department = $2,
       joining_date = $3,
       address = $4,
       gender = $5
     WHERE id = $6
     RETURNING *`,
    [qualification, department, joiningDate, address, gender, id],
  );

  return result.rows[0];
};

const deleteTeacher = async (id) => {
  const result = await pool.query(
    `DELETE FROM teachers
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};

export {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};

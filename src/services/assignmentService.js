import { pool } from "../config/database.js";

// Create Assignment
const createAssignment = async (data) => {
  const {
    teacherId,
    subjectId,
    classId,
    title,
    description,
    assignedDate,
    dueDate,
    attachmentUrl,
  } = data;

  const result = await pool.query(
    `INSERT INTO assignments
    (
      teacher_id,
      subject_id,
      class_id,
      title,
      description,
      assigned_date,
      due_date,
      attachment_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      teacherId,
      subjectId,
      classId,
      title,
      description,
      assignedDate,
      dueDate,
      attachmentUrl,
    ],
  );

  return result.rows[0];
};

// Get All Assignments
const getAssignments = async () => {
  const result = await pool.query(
    `SELECT *
     FROM assignments
     ORDER BY id DESC`,
  );

  return result.rows;
};

// Get Assignment By ID
const getAssignmentById = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM assignments
     WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

// Update Assignment
const updateAssignment = async (id, data) => {
  const {
    teacherId,
    subjectId,
    classId,
    title,
    description,
    assignedDate,
    dueDate,
    attachmentUrl,
    status,
  } = data;

  const result = await pool.query(
    `UPDATE assignments
     SET
       teacher_id = $1,
       subject_id = $2,
       class_id = $3,
       title = $4,
       description = $5,
       assigned_date = $6,
       due_date = $7,
       attachment_url = $8,
       status = $9,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $10
     RETURNING *`,
    [
      teacherId,
      subjectId,
      classId,
      title,
      description,
      assignedDate,
      dueDate,
      attachmentUrl,
      status,
      id,
    ],
  );

  return result.rows[0];
};

// Delete Assignment
const deleteAssignment = async (id) => {
  const result = await pool.query(
    `DELETE FROM assignments
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};

export {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};

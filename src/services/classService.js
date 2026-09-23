import { pool } from "../config/database.js";

// Create Class
const createClass = async (data) => {
  const { name, description } = data;

  // Check if class already exists
  const existingClass = await pool.query(
    `SELECT id FROM classes WHERE name = $1`,
    [name],
  );

  if (existingClass.rows.length > 0) {
    throw {
      statusCode: 400,
      message: "Class already exists",
    };
  }

  // Create class
  const result = await pool.query(
    `INSERT INTO classes
    (
      name,
      description
    )
    VALUES ($1, $2)
    RETURNING
      id,
      name,
      description,
      created_at,
      updated_at`,
    [name, description],
  );

  return result.rows[0];
};

// Get All Classes
const getAllClasses = async () => {
  const result = await pool.query(
    `SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM classes
    ORDER BY id ASC`,
  );

  return result.rows;
};

// Get Class By ID
const getClassById = async (id) => {
  const result = await pool.query(
    `SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM classes
    WHERE id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Class not found",
    };
  }

  return result.rows[0];
};

// Update Class
const updateClass = async (id, data) => {
  const { name, description } = data;

  const existingClass = await pool.query(
    `SELECT id FROM classes WHERE id = $1`,
    [id],
  );

  if (existingClass.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Class not found",
    };
  }

  const result = await pool.query(
    `UPDATE classes
     SET
       name = COALESCE($1, name),
       description = COALESCE($2, description),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING
       id,
       name,
       description,
       created_at,
       updated_at`,
    [name, description, id],
  );

  return result.rows[0];
};

// Delete Class
const deleteClass = async (id) => {
  const result = await pool.query(
    `DELETE FROM classes
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Class not found",
    };
  }

  return {
    message: "Class deleted successfully",
  };
};

// Create Section
const createSection = async (data) => {
  const { classId, name } = data;

  // Check if class exists
  const existingClass = await pool.query(
    `SELECT id FROM classes WHERE id = $1`,
    [classId],
  );

  if (existingClass.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Class not found",
    };
  }

  // Check duplicate section in same class
  const existingSection = await pool.query(
    `SELECT id
     FROM sections
     WHERE class_id = $1
     AND name = $2`,
    [classId, name],
  );

  if (existingSection.rows.length > 0) {
    throw {
      statusCode: 400,
      message: "Section already exists in this class",
    };
  }

  // Create section
  const result = await pool.query(
    `INSERT INTO sections
    (
      class_id,
      name
    )
    VALUES ($1, $2)
    RETURNING
      id,
      class_id,
      name,
      created_at,
      updated_at`,
    [classId, name],
  );

  return result.rows[0];
};

// Get All Sections
const getAllSections = async () => {
  const result = await pool.query(
    `SELECT
      s.id,
      s.class_id,
      c.name AS class_name,
      s.name,
      s.created_at,
      s.updated_at
    FROM sections s
    JOIN classes c
      ON s.class_id = c.id
    ORDER BY c.id ASC, s.id ASC`,
  );

  return result.rows;
};

// Get Sections By Class
const getSectionsByClass = async (classId) => {
  const result = await pool.query(
    `SELECT
      id,
      class_id,
      name,
      created_at,
      updated_at
    FROM sections
    WHERE class_id = $1
    ORDER BY id ASC`,
    [classId],
  );

  return result.rows;
};

// Get Section By ID
const getSectionById = async (id) => {
  const result = await pool.query(
    `SELECT
      s.id,
      s.class_id,
      c.name AS class_name,
      s.name,
      s.created_at,
      s.updated_at
    FROM sections s
    JOIN classes c
      ON s.class_id = c.id
    WHERE s.id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Section not found",
    };
  }

  return result.rows[0];
};

// Update Section
const updateSection = async (id, data) => {
  const { classId, name } = data;

  const existingSection = await pool.query(
    `SELECT id
     FROM sections
     WHERE id = $1`,
    [id],
  );

  if (existingSection.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Section not found",
    };
  }

  if (classId) {
    const existingClass = await pool.query(
      `SELECT id
       FROM classes
       WHERE id = $1`,
      [classId],
    );

    if (existingClass.rows.length === 0) {
      throw {
        statusCode: 404,
        message: "Class not found",
      };
    }
  }

  const result = await pool.query(
    `UPDATE sections
     SET
       class_id = COALESCE($1, class_id),
       name = COALESCE($2, name),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING
       id,
       class_id,
       name,
       created_at,
       updated_at`,
    [classId, name, id],
  );

  return result.rows[0];
};

// Delete Section
const deleteSection = async (id) => {
  const result = await pool.query(
    `DELETE FROM sections
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (result.rows.length === 0) {
    throw {
      statusCode: 404,
      message: "Section not found",
    };
  }

  return {
    message: "Section deleted successfully",
  };
};
// Get All Classes With Sections And Students
const getClassesWithSections = async () => {
  const result = await pool.query(`
    SELECT
      c.id,
      c.name,
      c.description,
      c.created_at,
      c.updated_at,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', s.id,
            'name', s.name,
            'students',
            COALESCE(
              (
                SELECT json_agg(
                  json_build_object(
                    'id', st.id,
                    'userId', u.id,
                    'firstName', u.first_name,
                    'lastName', u.last_name,
                    'email', u.email,
                    'phone', u.phone,
                    'photoUrl', u.photo_url
                  )
                  ORDER BY u.first_name ASC
                )
                FROM students st
                JOIN users u
                  ON st.user_id = u.id
                WHERE st.section_id = s.id
              ),
              '[]'
            )
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS sections

    FROM classes c

    LEFT JOIN sections s
      ON c.id = s.class_id

    GROUP BY
      c.id,
      c.name,
      c.description,
      c.created_at,
      c.updated_at

    ORDER BY c.id ASC
  `);

  return result.rows;
};

export {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  createSection,
  getAllSections,
  getSectionsByClass,
  getSectionById,
  updateSection,
  deleteSection,
  getClassesWithSections,
};

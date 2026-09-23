import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../services/subjectService.js";

// ========================================
// CREATE SUBJECT
// ========================================

const createSubjectController = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject name is required",
      });
    }

    const subject = await createSubject({
      name: name.trim(),
      description: description?.trim() || null,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// GET ALL SUBJECTS
// ========================================

const getAllSubjectsController = async (req, res, next) => {
  try {
    const subjects = await getAllSubjects();

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// GET SUBJECT BY ID
// ========================================

const getSubjectByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subject = await getSubjectById(id);

    res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// UPDATE SUBJECT
// ========================================

const updateSubjectController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject name cannot be empty",
      });
    }

    const subject = await updateSubject(id, {
      name: name !== undefined ? name.trim() : undefined,
      description: description !== undefined ? description.trim() : undefined,
    });

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// DELETE SUBJECT
// ========================================

const deleteSubjectController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteSubject(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
};

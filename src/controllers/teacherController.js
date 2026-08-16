import {
  createTeacher,
  deleteTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
} from "../services/teacherService.js";

// Create Teacher
const createTeacherController = async (req, res) => {
  try {
    const data = await createTeacher(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Teachers
const getTeacherController = async (req, res) => {
  try {
    const data = await getTeachers();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Teacher By ID
const getTeacherByIdController = async (req, res) => {
  try {
    const data = await getTeacherById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Teacher
const updateTeacherController = async (req, res) => {
  try {
    const data = await updateTeacher(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Teacher
const deleteTeacherController = async (req, res) => {
  try {
    const data = await deleteTeacher(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createTeacherController,
  getTeacherController,
  getTeacherByIdController,
  updateTeacherController,
  deleteTeacherController,
};

import {
  createStudent,
  deleteStudent,
  getStudents,
  getStudentById,
  updateStudent,
} from "../services/studentService.js";

// Create Student
const createStudentController = async (req, res) => {
  try {
    const data = await createStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
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

// Get All Students
const getStudentsController = async (req, res) => {
  try {
    const data = await getStudents();

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

// Get Student By ID
const getStudentByIdController = async (req, res) => {
  try {
    const data = await getStudentById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
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

// Update Student
const updateStudentController = async (req, res) => {
  try {
    const data = await updateStudent(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
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

// Delete Student
const deleteStudentController = async (req, res) => {
  try {
    const data = await deleteStudent(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
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
  createStudentController,
  getStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
};

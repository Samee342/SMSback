import {
  createAssignment,
  deleteAssignment,
  getAssignmentById,
  getAssignments,
  updateAssignment,
} from "../services/assignmentService.js";

const createAssignmentController = async (req, res) => {
  try {
    const data = await createAssignment(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAssignmentController = async (req, res) => {
  try {
    const data = await getAssignments();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAssignmentByIdController = async (req, res) => {
  try {
    const data = await getAssignmentById(req.params.id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateAssignmentController = async (req, res) => {
  try {
    const data = await updateAssignment(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteAssignmentController = async (req, res) => {
  try {
    const data = await deleteAssignment(req.params.id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createAssignmentController,
  getAssignmentByIdController,
  getAssignmentController,
  updateAssignmentController,
  deleteAssignmentController,
};

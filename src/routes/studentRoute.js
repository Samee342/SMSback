import express from "express";

import {
  createStudentController,
  deleteStudentController,
  getStudentsController,
  getStudentByIdController,
  updateStudentController,
} from "../controllers/studentController.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { admin } from "../constants/roles.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all students
router.get("/", getStudentsController);

// Get student by ID
router.get("/:id", getStudentByIdController);

// Create student
router.post("/", auth, createStudentController);

// Update student
router.patch("/:id", auth, updateStudentController);

// Delete student
router.delete("/:id", auth, deleteStudentController);

export default router;

import express from "express";

import {
  createTeacherController,
  deleteTeacherController,
  getTeacherController,
  getTeacherByIdController,
  updateTeacherController,
} from "../controllers/teacherController.js";

const router = express.Router();

// Get all teachers
router.get("/", getTeacherController);

// Get teacher by ID
router.get("/:id", getTeacherByIdController);

// Create teacher
router.post("/", createTeacherController);

// Update teacher
router.patch("/:id", updateTeacherController);

// Delete teacher
router.delete("/:id", deleteTeacherController);

export default router;

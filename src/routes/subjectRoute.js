import express from "express";

import {
  createSubjectController,
  getAllSubjectsController,
  getSubjectByIdController,
  updateSubjectController,
  deleteSubjectController,
} from "../controllers/subjectController.js";

const router = express.Router();

// ========================================
// SUBJECT ROUTES
// ========================================

// Create subject
router.post("/", createSubjectController);

// Get all subjects
router.get("/", getAllSubjectsController);

// Get subject by ID
router.get("/:id", getSubjectByIdController);

// Update subject
router.put("/:id", updateSubjectController);

// Delete subject
router.delete("/:id", deleteSubjectController);

export default router;

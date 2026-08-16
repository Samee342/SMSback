import express from "express";
import {
  createAssignmentController,
  deleteAssignmentController,
  getAssignmentByIdController,
  getAssignmentController,
  updateAssignmentController,
} from "../controllers/assignmentController.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { teacher } from "../constants/roles.js";

const router = express.Router();

router.get("/", getAssignmentController);
router.get("/:id", getAssignmentByIdController);
router.post("/", auth, roleBasedAuth(teacher), createAssignmentController);
router.patch("/:id", auth, roleBasedAuth(teacher), updateAssignmentController);
router.delete("/:id", deleteAssignmentController);

export default router;

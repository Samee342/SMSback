import express from "express";

import {
  createClassController,
  createSectionController,
  deleteClassController,
  deleteSectionController,
  getAllClassesController,
  getAllSectionsControllers,
  getClassByIdController,
  updateClassController,
  updateSectionController,
  getClassesWithSectionsController,
} from "../controllers/classController.js";

const router = express.Router();

// ====================
// Class Routes
// ====================

router.post("/", createClassController);

router.get("/", getAllClassesController);

router.get("/classes-with-sections", getClassesWithSectionsController);

// ====================
// Section Routes
// ====================

router.get("/section", getAllSectionsControllers);

router.post("/section", createSectionController);

router.patch("/section/:id", updateSectionController);

router.delete("/section/:id", deleteSectionController);

// ====================
// Class ID Routes
// ====================

router.get("/:id", getClassByIdController);

router.patch("/:id", updateClassController);

router.delete("/:id", deleteClassController);

export default router;

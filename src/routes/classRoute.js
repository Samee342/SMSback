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
} from "../controllers/classController.js";

const router = express.Router();

router.post("/", createClassController);
router.get("/", getAllClassesController);
router.get("/:id", getClassByIdController);
router.patch("/:id", updateClassController);
router.delete("/:id", deleteClassController);

router.get("/section", getAllSectionsControllers);
router.post("/section", createSectionController);
router.patch("/section/:id", updateSectionController);
router.delete("/section/:id", deleteSectionController);

export default router;

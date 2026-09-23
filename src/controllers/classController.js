import {
  createClass,
  deleteClass,
  deleteSection,
  getAllClasses,
  getAllSections,
  getClassesWithSections,
  getClassById,
  createSection,
  updateClass,
  updateSection,
} from "../services/classService.js";

const createClassController = async (req, res) => {
  try {
    const data = await createClass(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllClassesController = async (req, res) => {
  try {
    const data = await getAllClasses();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getClassByIdController = async (req, res) => {
  try {
    const data = await getClassById(req.params.id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClassController = async (req, res) => {
  try {
    const data = await updateClass(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteClassController = async (req, res) => {
  try {
    const data = await deleteClass(req.params.id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const createSectionController = async (req, res) => {
  try {
    const data = await createSection(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllSectionsControllers = async (req, res) => {
  try {
    const data = await getAllSections();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateSectionController = async (req, res) => {
  try {
    const data = await updateSection(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteSectionController = async (req, res) => {
  try {
    const data = await deleteSection(req.params.id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getClassesWithSectionsController = async (req, res) => {
  try {
    const data = await getClassesWithSections();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch classes with sections",
    });
  }
};
export {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
  createSectionController,
  getAllSectionsControllers,
  updateSectionController,
  deleteSectionController,
  getClassesWithSectionsController,
};

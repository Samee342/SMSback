import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../services/userService.js";

// Create User
const createUserController = async (req, res) => {
  try {
    const data = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
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

// Get All Users
const getUsersController = async (req, res) => {
  try {
    const data = await getUsers();

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

// Get User By ID
const getUserByIdController = async (req, res) => {
  try {
    const data = await getUserById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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

// Update User
const updateUserController = async (req, res) => {
  try {
    const data = await updateUser(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
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

// Delete User
const deleteUserController = async (req, res) => {
  try {
    const data = await deleteUser(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
  createUserController,
  getUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};

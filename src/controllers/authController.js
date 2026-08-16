import { login, logout, register } from "../services/authService.js";
import { createJwt } from "../utilis/jwt.js";
import cookie from "cookie";

const registerController = async (req, res) => {
  try {
    const data = await register(req.body);

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

const loginController = async (req, res) => {
  try {
    // Check email/password from PostgreSQL
    const data = await login(req.body);

    // Create JWT
    const token = createJwt(data);

    // Store JWT in HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      }),
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const logoutController = async (req, res) => {
  try {
    await logout();

    // Delete authToken cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export { registerController, loginController, logoutController };

import cookie from "cookie";
import { verifyJwt } from "../utilis/jwt.js";

const auth = async (req, res, next) => {
  let authToken;

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [type, token] = authHeader.split(" ");

    if (type === "Bearer" && token) {
      authToken = token;
    }
  }

  // Get JWT from cookie
  if (!authToken && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);

    authToken = cookies.authToken;
  }

  if (!authToken) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  try {
    const data = await verifyJwt(authToken);

    req.user = data;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default auth;

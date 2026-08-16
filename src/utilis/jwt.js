import jwt from "jsonwebtoken";
import config from "../config/config.js";

function createJwt(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
}

const verifyJwt = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

export { verifyJwt, createJwt };

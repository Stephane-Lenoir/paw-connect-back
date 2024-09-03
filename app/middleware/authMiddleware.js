import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401); // Unauthorized

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(403);
    req.user = user;
    next();
  } catch (error) {
    res.status(403); // Forbidden
  }
};

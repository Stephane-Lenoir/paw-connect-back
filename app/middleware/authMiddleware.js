import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = async (req, res, next) => {
  // We retrieve the token from the authorization header of the request
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  // We extract the token from the header
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403); // Forbidden
  }
};

export const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role_id !== 1)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

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

// Constants for role IDs (adjust according to your system)
export const isAdmin = 1;
export const isMember = 2;
export const isAssociation = 3;

// Middleware to check if the user has any of the specified roles
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ error: "No user attached to the request" });
    }

    if (allowedRoles.includes(req.user.role_id)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

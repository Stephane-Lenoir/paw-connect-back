import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = async (req, res, next) => {
  // On récupère le token du header d'autorisation de la requete
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  // On extrait le token du header
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

export const checkRole = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "You need to log in" });
  const dbUser = await User.findByPk(req.user.id);
  if (dbUser.role_id !== req.user.id)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

export const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role_id !== 1)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

export const isAssoc = (req, res, next) => {
  if (req.user.role_id !== 3)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

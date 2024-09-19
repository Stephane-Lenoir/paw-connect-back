import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
};

export const optionalAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }

  next();
};

export const checkRole = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "You need to log in" });
  const dbUser = await User.findByPk(req.user.id);
  if (dbUser.role_id !== req.user.id)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};

export const isAssoc = (req, res, next) => {
  if (req.user.role_id !== 3)
    return res.status(401).json({ error: "Unauthorized access" });
  next();
};
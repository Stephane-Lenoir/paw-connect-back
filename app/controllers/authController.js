import { authService } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { user } = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      res.status(400).json({ error: messages });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Email already in use." });
    } else {
      res.status(500).json({
        error: "An error occurred during registration. Please try again.",
      });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token, expirationTime } = await authService.login(
      email,
      password
    );
    res.status(200).json({ user, token, expirationTime });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ error: "User not found. Check email." });
    } else if (error.message === "Invalid password") {
      res.status(401).json({ error: "Incorrect password." });
    } else {
      res
        .status(500)
        .json({ error: "An error occured during login. Please try again." });
    }
  }
};

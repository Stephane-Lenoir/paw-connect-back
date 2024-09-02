import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({
      error: "Invalid registration data. Please check your information.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
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

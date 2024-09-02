import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../utils/validationSchemas.js";
import { validateRequest } from "../middleware/validateRequest.js";

export const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);

import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../utils/validationSchemas.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";

export const router = express.Router();

router.post("/register", validateRequest(registerSchema), cw(register));
router.post("/login", validateRequest(loginSchema), cw(login));

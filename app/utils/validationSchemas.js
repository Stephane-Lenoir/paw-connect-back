import Joi from "joi";

// Validation schema for registration
export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  firstname: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(12).max(255),
});

// Validation schema for login
export const loginSchema = Joi.object({
  email: Joi.string().email.required(),
  password: Joi.string().required(),
});

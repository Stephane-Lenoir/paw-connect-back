import Joi from "joi";

// Validation schema for registration
export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  firstname: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(12).max(255),
  isAssociation: Joi.string().valid("Oui", "Non").required(), // schema modifié
});

// Validation schema for login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for search
export const searchSchema = Joi.object({
  species: Joi.string(),
  location: Joi.string(),
  gender: Joi.string(),
  availability: Joi.boolean(),
  race: Joi.string(),
  age: Joi.number().integer().min(0).max(30),
});

export const updateSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  password: Joi.string().required(),
});

// Schema for creation animal
export const createAnimalSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  species: Joi.string().required().min(2).max(100),
  description: Joi.string().required().min(2).max(255),
  race: Joi.string().required().min(2).max(100),
  gender: Joi.string().required().min(2).max(25),
  location: Joi.string().required().min(2).max(255),
  photo: Joi.string().required().min(1).max(255),
  birthday: Joi.number().integer().required().min(0).max(30),
  availability: Joi.boolean().required(),
  user_id: Joi.number(),
});

export const updateAnimalSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  species: Joi.string().required().min(2).max(100),
  description: Joi.string().optional().min(2).max(255),
  race: Joi.string().optional().min(2).max(100),
  gender: Joi.string().optional().min(2).max(25),
  location: Joi.string().optional().min(2).max(255),
  photo: Joi.string().optional().min(1).max(255),
  birthday: Joi.number().integer().optional().min(0).max(30),
  availability: Joi.boolean().required(),
});

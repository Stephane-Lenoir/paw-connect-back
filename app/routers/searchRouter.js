import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import { searchFilter } from "../controllers/searchController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { searchSchema } from "../utils/validationSchemas.js";

export const router = Router();

router.post("/search", validateRequest(searchSchema), cw(searchFilter));

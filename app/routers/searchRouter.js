import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import { searchFilter } from "../controllers/searchController.js";

export const router = Router();

router.get("/search", cw(searchFilter));

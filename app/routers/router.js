import { Router } from "express";
import { router as homeRouter } from "./homeRouter.js";
import { router as animalRouter } from "./animalRouter.js";

export const router = Router();

// Add all sub-routers here !
router.use(homeRouter);
router.use(animalRouter);

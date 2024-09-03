import { Router } from "express";
import { router as homeRouter } from "./homeRouter.js";
import { router as animalRouter } from "./animalRouter.js";
import { router as associationRouter } from "./associationRouter.js";
import { router as authRouter } from "./authRouter.js";

export const router = Router();

// Add all sub-routers here !
router.use(homeRouter);
router.use(animalRouter);
router.use(authRouter);
router.use(associationRouter);

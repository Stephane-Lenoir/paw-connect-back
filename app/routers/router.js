import { Router } from "express";
import { router as homeRouter } from "./homeRouter.js";
import { router as animalRouter } from "./animalRouter.js";
import { router as authRouter } from "./authRouter.js";
import { router as searchRouter } from "./searchRouter.js";
import { router as userRouter } from "./userRouter.js";
import { router as requestRouter } from "./requestRouter.js";

export const router = Router();

// Add all sub-routers here !
router.use(homeRouter);
router.use(animalRouter);
router.use(authRouter);
router.use(searchRouter);
router.use(userRouter);
router.use(requestRouter);

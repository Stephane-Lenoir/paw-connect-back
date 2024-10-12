import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as homeController from "../controllers/homeController.js";

const router = Router();

router.get("/", cw(homeController.getAllAnimals))

export { router };

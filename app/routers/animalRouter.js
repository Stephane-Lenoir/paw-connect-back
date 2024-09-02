import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as animalController from "../controllers/animalController.js";

export const router = Router();

router.get("/animals", cw(animalController.getAllAnimals));
router.get("/animals/:id", cw(animalController.getOneAnimal));

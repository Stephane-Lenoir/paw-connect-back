import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as animalController from "../controllers/animalController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createAnimalSchema,
  updateAnimalSchema,
} from "../utils/validationSchemas.js";

export const router = Router();

router.get("/animals", cw(animalController.getAllAnimals));
// router.get("/animals/:id", cw(animalController.getOneAnimal));
router.get("/animals/:id", authenticateToken, cw(animalController.getAnimalsByUserId));

router.post(
  "/animals",
  authenticateToken,
  validateRequest(createAnimalSchema),
  cw(animalController.addAnimal)
);
router.put(
  "/animals/:id",
  validateRequest(updateAnimalSchema),
  cw(animalController.updateAnimal)
);
router.delete("/animals/:id", cw(animalController.deleteAnimal));

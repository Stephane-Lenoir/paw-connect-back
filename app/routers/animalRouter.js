import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as animalController from "../controllers/animalController.js";
import {
  authenticateToken,
  checkRole,
  isAdmin,
  isAssociation,
} from "../middleware/authMiddleware.js";
import { fileRequest, validateRequest } from "../middleware/validateRequest.js";
import {
  createAnimalSchema,
  updateAnimalSchema,
  photoAnimalSchema,
} from "../utils/validationSchemas.js";
import { upload } from "../utils/multerConfig.js";

export const router = Router();

router.get("/animals", cw(animalController.getAllAnimals));
router.get(
  "/animals/:id",
  authenticateToken,
  cw(animalController.getAnimalsByUserId)
);

router.post(
  "/animals",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  upload.single("photo"),
  validateRequest(createAnimalSchema),
  fileRequest(photoAnimalSchema),
  cw(animalController.addAnimal)
);
router.put(
  "/animals/:id",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  upload.single("photo"),
  validateRequest(updateAnimalSchema),
  fileRequest(photoAnimalSchema),
  cw(animalController.updateAnimal)
);
router.delete(
  "/animals/:id",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  cw(animalController.deleteAnimal)
);

import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as associationController from "../controllers/associationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

export const router = Router();

router.get("/associations", cw(associationController.getAllAssociations));
router.get("/associations/:id", cw(associationController.getOneAssociation));

router.post(
  "/associations",
  authenticateToken,
  cw(associationController.addAssociation)
);

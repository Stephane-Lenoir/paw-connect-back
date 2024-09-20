import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import {
  getAllMembers,
  updateMember,
  deleteMember,
  getOneMember,
} from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { updateSchema } from "../utils/validationSchemas.js";
import {
  authenticateToken,
  checkRole,
  isAdmin,
} from "../middleware/authMiddleware.js";

export const router = Router();

router.get(
  "/profiles/getAll",
  authenticateToken,
  checkRole(isAdmin),
  cw(getAllMembers)
);
router.get("/profiles/getOne", authenticateToken, cw(getOneMember));
router.put(
  "/profiles/:id",
  authenticateToken,
  validateRequest(updateSchema),
  cw(updateMember)
);
router.delete(
  "/profiles/:id",
  authenticateToken,
  checkRole(isAdmin),
  cw(deleteMember)
);

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
import { authenticateToken } from "../middleware/authMiddleware.js";

export const router = Router();

router.get("/profiles", cw(getAllMembers));
router.get("/profiles/:id", authenticateToken, cw(getOneMember));
router.put("/profiles/:id", validateRequest(updateSchema), cw(updateMember));
router.delete("/profiles/:id", cw(deleteMember));

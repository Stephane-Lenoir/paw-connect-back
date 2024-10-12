import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as requestController from "../controllers/requestController.js";
import {
  authenticateToken,
  checkRole,
  isAdmin,
  isAssociation,
  isMember,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/requests",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  cw(requestController.getAllRequests)
);
router.get(
  "/requests/:id",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  cw(requestController.getOneRequest)
);
router.post(
  "/requests",
  authenticateToken,
  checkRole(isAdmin, isMember),
  cw(requestController.addRequest)
);
router.put(
  "/requests/:id",
  authenticateToken,
  checkRole(isAdmin, isAssociation),
  cw(requestController.updateRequestStatus)
);
router.delete(
  "/requests/:id",
  authenticateToken,
  checkRole(isAdmin),
  cw(requestController.deleteRequest)
);

export { router };
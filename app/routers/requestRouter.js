import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as requestController from "../controllers/requestController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

export const router = Router();

router.get("/requests", cw(requestController.getAllRequests));
router.get("/requests/:id", cw(requestController.getOneRequest));
router.post("/requests", authenticateToken, cw(requestController.addRequest));
router.put("/requests/:id", cw(requestController.updateRequestStatus));
router.delete("/requests/:id", cw(requestController.deleteRequest));

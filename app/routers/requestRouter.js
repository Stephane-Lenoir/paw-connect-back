import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as requestController from "../controllers/requestController.js";

export const router = Router();

router.get("/requests", cw(requestController.getAllRequests));
router.get("/requests/:id", cw(requestController.getOneRequest));
router.post("/requests", cw(requestController.addRequest));

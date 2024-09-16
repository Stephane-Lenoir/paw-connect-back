import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as donationController from "../controllers/donationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { donationSchema } from "../utils/validationSchemas.js";

export const router = Router();

router.post("/donations", authenticateToken,validateRequest(donationSchema),cw(donationController.createDonation));

router.get("/donations/user/:userId", authenticateToken, cw(donationController.getDonationsByUser));
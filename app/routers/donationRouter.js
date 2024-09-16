import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as donationController from "../controllers/donationController.js";
import { authenticateToken, optionalAuthenticateToken } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { donationSchema } from "../utils/validationSchemas.js";

const router = Router();

router.post("/donations", optionalAuthenticateToken, validateRequest(donationSchema), cw(donationController.createDonation));
router.get("/donations/user/me", authenticateToken, cw(donationController.getDonationsByUser));

export { router };
import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import * as donationController from "../controllers/donationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

export const router = Router();

router.post("/donations", authenticateToken, (req, res, next) => {
    console.log("Route POST /donations atteinte avec les données:", req.body);
    next();
  }, cw(donationController.createDonation));
  
  router.get("/donations/user/:userId", authenticateToken, cw(donationController.getDonationsByUser));


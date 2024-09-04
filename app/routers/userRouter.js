import { Router } from "express";
import { controllerWrapper as cw } from "../utils/controllerWrapper.js";
import { getAllMembers, updateMember, deleteMember } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { updateSchema } from "../utils/validationSchemas.js";



export const router = Router();

router.get("/profiles", cw(getAllMembers));
router.put("/profiles/:id",validateRequest(updateSchema), cw(updateMember));
router.delete("/profiles/:id", cw(deleteMember));

// on recupére bien les données tu peux voir sur mon écran si besoin
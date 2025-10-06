import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { profileValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put(
    "/update",
    authenticateToken,
    validate(profileValidation.updateProfile),
    updateProfile
);

export default router;

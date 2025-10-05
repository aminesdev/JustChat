import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put("/update", authenticateToken, updateProfile);

export default router;

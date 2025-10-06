import express from "express";
import {
    signup,
    login,
    logout,
    refreshToken,
    logoutAll,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { validate } from "../middlewares/validation.js";
import { authValidation } from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), signup);
router.post("/login", validate(authValidation.login), login);
router.post("/logout", validate(authValidation.logout), logout);
router.post(
    "/refresh-token",
    validate(authValidation.refreshToken),
    refreshToken
);
router.post("/logout-all", authenticateToken, logoutAll);

export default router;

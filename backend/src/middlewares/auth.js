import { tokenService } from "../services/tokenService.js";
import { unauthorizedResponse } from "../utils/responseHandler.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return unauthorizedResponse(res, "Access token required");
    }

    try {
        const decoded = tokenService.validateAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return unauthorizedResponse(res, "Invalid or expired token");
    }
};

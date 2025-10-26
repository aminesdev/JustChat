import { tokenService } from "../services/tokenService.js";
import { userRepository } from "../repositories/userRepository.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        const decoded = tokenService.validateAccessToken(token);
        const user = await userRepository.findById(decoded.userId);

        if (!user) {
            return next(new Error("Authentication error: User not found"));
        }

        socket.userId = decoded.userId;
        socket.user = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
        };

        next();
    } catch (error) {
        console.error("Socket authentication error:", error);
        next(new Error("Authentication error: Invalid token"));
    }
};

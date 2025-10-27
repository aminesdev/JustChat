import { tokenService } from "../services/tokenService.js";
import { userRepository } from "../repositories/userRepository.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            console.log("Socket authentication failed: No token provided");
            return next(new Error("Authentication error: No token provided"));
        }

        const decoded = tokenService.validateAccessToken(token);
        const user = await userRepository.findById(decoded.userId);

        if (!user) {
            console.log(
                `Socket authentication failed: User ${decoded.userId} not found`
            );
            return next(new Error("Authentication error: User not found"));
        }

        socket.userId = decoded.userId;
        socket.user = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
        };

        console.log(
            `Socket authentication successful for user ${socket.userId}`
        );
        next();
    } catch (error) {
        console.error("Socket authentication error:", error.message);
        next(new Error("Authentication error: Invalid token"));
    }
};

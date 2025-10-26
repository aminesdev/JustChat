import { connectedUsers } from "../config/socket.js";

export const setupUserHandlers = (socket) => {
    socket.on("get_online_users", async (callback) => {
        try {
            const onlineUsers = Array.from(connectedUsers.values()).map(
                (conn) => conn.user
            );

            if (typeof callback === "function") {
                callback({
                    success: true,
                    online_users: onlineUsers,
                });
            }
        } catch (error) {
            console.error("Error getting online users:", error);
            if (typeof callback === "function") {
                callback({
                    success: false,
                    error: "Failed to get online users",
                });
            }
        }
    });
};

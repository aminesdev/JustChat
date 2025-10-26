import { io } from "socket.io-client";
import { APP_CONFIG } from "@/constants/config.js";
import { useAuthStore } from "@/stores/authStore";
import { useMessageStore } from "@/stores/messageStore";
import { useConversationStore } from "@/stores/conversationStore";
import { useUserStore } from "@/stores/userStore";

class SocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = APP_CONFIG.REALTIME.MAX_RECONNECT_ATTEMPTS;
    }

    connect() {
        if (this.socket?.connected) {
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return;
        }

        try {
            this.socket = io(APP_CONFIG.WS_URL, {
                auth: {
                    token: accessToken,
                },
                transports: ["websocket", "polling"],
                timeout: 10000,
                forceNew: true,
            });

            this.setupEventListeners();
        } catch (error) {
            console.error("Socket connection failed:", error);
        }
    }

    setupEventListeners() {
        if (!this.socket) return;

        this.socket.on("connect", () => {
            this.isConnected = true;
            this.reconnectAttempts = 0;
            this.joinCurrentConversation();
        });

        this.socket.on("disconnect", () => {
            this.isConnected = false;
        });

        this.socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            this.handleReconnection();
        });

        this.socket.on("new_message", (data) => {
            const { addMessage } = useMessageStore.getState();
            const { updateConversationLastMessage } =
                useConversationStore.getState();

            if (data.message) {
                addMessage(data.conversation_id, data.message);
                updateConversationLastMessage(
                    data.conversation_id,
                    data.message
                );
            }
        });

        this.socket.on("message_read", (data) => {
            // Handle read receipts if needed
        });

        this.socket.on("all_messages_read", (data) => {
            // Handle all messages read
        });

        this.socket.on("user_typing", (data) => {
            // Handle typing indicators
        });

        this.socket.on("user_online", (data) => {
            const { setUserOnline } = useUserStore.getState();
            if (data.user_id) {
                setUserOnline(data.user_id);
            }
        });

        this.socket.on("user_offline", (data) => {
            const { setUserOffline } = useUserStore.getState();
            if (data.user_id) {
                setUserOffline(data.user_id);
            }
        });

        this.socket.on("conversation_updated", () => {
            const { loadConversations } = useConversationStore.getState();
            loadConversations();
        });
    }

    joinConversation(conversationId) {
        if (this.isConnected && conversationId) {
            this.socket.emit("join_conversation", conversationId);
        }
    }

    leaveConversation(conversationId) {
        if (this.isConnected && conversationId) {
            this.socket.emit("leave_conversation", conversationId);
        }
    }

    joinCurrentConversation() {
        const { currentConversationId } = useConversationStore.getState();
        if (currentConversationId) {
            this.joinConversation(currentConversationId);
        }
    }

    sendMessage(messageData) {
        if (!this.isConnected) {
            return Promise.reject(new Error("Socket not connected"));
        }

        return new Promise((resolve, reject) => {
            this.socket.emit("send_message", messageData, (response) => {
                if (response.success) {
                    resolve(response);
                } else {
                    reject(new Error(response.error));
                }
            });
        });
    }

    startTyping(conversationId) {
        if (this.isConnected && conversationId) {
            this.socket.emit("typing_start", {
                conversation_id: conversationId,
            });
        }
    }

    stopTyping(conversationId) {
        if (this.isConnected && conversationId) {
            this.socket.emit("typing_stop", {
                conversation_id: conversationId,
            });
        }
    }

    markAsRead(messageId, conversationId) {
        if (this.isConnected && messageId && conversationId) {
            this.socket.emit("mark_as_read", {
                message_id: messageId,
                conversation_id: conversationId,
            });
        }
    }

    markAllAsRead(conversationId) {
        if (this.isConnected && conversationId) {
            this.socket.emit("mark_all_as_read", {
                conversation_id: conversationId,
            });
        }
    }

    handleReconnection() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * this.reconnectAttempts, 10000);

            setTimeout(() => {
                this.connect();
            }, delay);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    getConnectionStatus() {
        return this.isConnected;
    }
}

export const socketService = new SocketService();

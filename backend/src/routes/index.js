import express from "express";
import authRoutes from "./auth.js";
import profileRoutes from "./profile.js";
import conversationRoutes from "./conversation.js";
import messageRoutes from "./message.js";
import userRoutes from "./user.js";
import uploadRoutes from "./upload.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/conversations", conversationRoutes);
router.use("/conversations", messageRoutes);
router.use("/users", userRoutes);
router.use("/upload", uploadRoutes);

export default router;

import express from "express";
import {
    uploadFile,
    uploadImage,
    cloudinaryHealth,
} from "../controllers/uploadController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload endpoints
 */

/**
 * @swagger
 * /upload/health:
 *   get:
 *     summary: Check Cloudinary health status
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cloudinary is healthy
 *       503:
 *         description: Cloudinary is not responding
 */
router.get("/health", cloudinaryHealth);

// ... rest of your existing routes ...

/**
 * @swagger
 * /upload/file:
 *   post:
 *     summary: Upload any file type
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 enum: [message, profile]
 *                 default: message
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     public_id:
 *                       type: string
 *                     resource_type:
 *                       type: string
 *                     file_extension:
 *                       type: string
 *                     original_name:
 *                       type: string
 *                     bytes:
 *                       type: integer
 */
router.post("/file", upload.single("file"), uploadFile);

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload an image (backward compatibility)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 enum: [message, profile]
 *                 default: message
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/image", upload.single("image"), uploadImage);

export default router;

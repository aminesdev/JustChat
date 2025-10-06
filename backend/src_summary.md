# Project: src

## File: app.js

```js
import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

app.use("/api", routes);

export default app;
```

## File: config/cloudinary.js

```js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export async function testCloudinary() {
    try {
        const result = await cloudinary.api.ping();
        console.log("Cloudinary configuration successful!");
        console.log("Status:", result.status);
    } catch (error) {
        console.log("Cloudinary configuration failed:");
        console.log("Error:", error.message);
    }
}

export default cloudinary;
```

## File: config/database.js

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export async function connectDb() {
    try {
        await prisma.$connect();
        console.log("PostgreSQL Connected via Prisma");
    } catch (err) {
        console.log("Database connection error", err.message);
        process.exit(1);
    }
}
```

## File: controllers/authController.js

```js
import {
    signupService,
    loginService,
    logoutService,
    refreshTokenService,
} from "../services/authService.js";
import { successResponse, createdResponse } from "../utils/responseHandler.js";
import { handleAuthError } from "../utils/errorHandler.js";

export const signup = async (req, res) => {
    try {
        const result = await signupService(req.body);

        createdResponse(res, "User created successfully", {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
    } catch (error) {
        handleAuthError(res, error);
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        successResponse(res, "Login successful", {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
    } catch (error) {
        handleAuthError(res, error);
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await refreshTokenService(refreshToken);

        successResponse(res, "Access token refreshed successfully", {
            accessToken: result.accessToken,
        });
    } catch (error) {
        handleAuthError(res, error);
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await logoutService(refreshToken);

        successResponse(res, "Logged out successfully");
    } catch (error) {
        handleAuthError(res, error);
    }
};
```

## File: controllers/profileController.js

```js
import {
    updateProfileService,
    getProfileService,
} from "../services/profileService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleProfileError } from "../utils/errorHandler.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // From auth middleware
        const updatedUser = await updateProfileService(userId, req.body);

        successResponse(res, "Profile updated successfully", {
            user: updatedUser,
        });
    } catch (error) {
        handleProfileError(res, error);
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await getProfileService(userId);

        successResponse(res, "Profile retrieved successfully", { user });
    } catch (error) {
        handleProfileError(res, error);
    }
};
```

## File: middlewares/auth.js

```js
import { verifyAccessToken } from "../utils/jwt.js";
import { unauthorizedResponse } from "../utils/responseHandler.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return unauthorizedResponse(res, "Access token required");
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return unauthorizedResponse(res, "Invalid or expired token");
    }
};
```

## File: routes/auth.js

```js
import express from "express";
import {
    signup,
    login,
    logout,
    refreshToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

export default router;
```

## File: routes/index.js

```js
import express from "express";
import authRoutes from "./auth.js";
import profileRoutes from "./profile.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
```

## File: routes/profile.js

```js
import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticateToken, getProfile);
router.put("/update", authenticateToken, updateProfile);

export default router;
```

## File: server.js

```js
import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import { testCloudinary } from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT;

async function start() {
    await connectDb();
    await testCloudinary();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
```

## File: services/authService.js

```js
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/jwt.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const signupService = async (userData) => {
    const { email, full_name, password } = userData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            full_name,
            password_hash,
        },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await storeRefreshToken(user.id, refreshToken);

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        },
        accessToken,
        refreshToken,
    };
};

export const loginService = async (credentials) => {
    const { email, password } = credentials;

    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await storeRefreshToken(user.id, refreshToken);

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshTokenService = async (token) => {
    if (!token) {
        throw new Error("REFRESH_TOKEN_REQUIRED");
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(token);

    // Check if refresh token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!storedToken || storedToken.user.id !== decoded.userId) {
        throw new Error("INVALID_REFRESH_TOKEN");
    }

    // Check if token is expired
    if (new Date() > storedToken.expires_at) {
        await prisma.refreshToken.delete({
            where: { token },
        });
        throw new Error("REFRESH_TOKEN_EXPIRED");
    }

    // Generate new access token
    const accessToken = generateAccessToken(decoded.userId);

    return { accessToken };
};

export const logoutService = async (token) => {
    if (token) {
        await prisma.refreshToken.delete({
            where: { token },
        });
    }
    return { success: true };
};

// Helper function
const storeRefreshToken = async (userId, token) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await prisma.refreshToken.create({
        data: {
            token,
            user_id: userId,
            expires_at: expiresAt,
        },
    });
};
```

## File: services/profileService.js

```js
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import {
    uploadImageService,
    deleteImageService,
} from "./fileStorageService.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const updateProfileService = async (userId, updateData) => {
    const { full_name, avatar_file, currentPassword, newPassword } = updateData;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const updateFields = {};

    // Update basic profile info
    if (full_name) updateFields.full_name = full_name;

    // Handle image upload
    let newAvatarUrl = null;
    if (avatar_file) {
        // Upload new image to Cloudinary
        const uploadResult = await uploadImageService(avatar_file);
        newAvatarUrl = uploadResult.secure_url;
        updateFields.avatar_url = newAvatarUrl;

        // Delete old image from Cloudinary if exists
        if (user.avatar_url) {
            const oldPublicId = extractPublicId(user.avatar_url);
            if (oldPublicId) {
                try {
                    await deleteImageService(oldPublicId);
                } catch (error) {
                    console.log("Failed to delete old image:", error.message);
                }
            }
        }
    }

    // Handle password change
    if (newPassword) {
        if (!currentPassword) {
            throw new Error("CURRENT_PASSWORD_REQUIRED");
        }

        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password_hash
        );
        if (!isCurrentPasswordValid) {
            throw new Error("INVALID_CURRENT_PASSWORD");
        }

        updateFields.password_hash = await bcrypt.hash(newPassword, saltRounds);
    }

    // Update user
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateFields,
        select: {
            id: true,
            email: true,
            full_name: true,
            avatar_url: true,
            is_online: true,
            last_seen: true,
            created_at: true,
        },
    });

    return updatedUser;
};

export const getProfileService = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            full_name: true,
            avatar_url: true,
            is_online: true,
            last_seen: true,
            created_at: true,
        },
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
};
```

## File: services/fileStorageService.JS

```JS
import cloudinary from "../config/cloudinary.js";

export const uploadImageService = async (fileBuffer, folder = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "image",
                transformation: [
                    { width: 500, height: 500, crop: "limit" },
                    { quality: "auto" },
                    { format: "webp" },
                ],
            },
            (error, result) => {
                if (error) {
                    reject(new Error("UPLOAD_FAILED"));
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteImageService = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("DELETE_FAILED");
    }
};

```

## File: utils/cloudinaryUtils.js

```js
import cloudinary from "../config/cloudinary.js";

export const extractPublicId = (url) => {
    if (!url) return null;

    const matches = url.match(/\/upload\/.*\/([^/.]+)(?=\.[^.]*$)/);
    return matches ? matches[1] : null;
};

export const uploadToCloudinary = async (fileBuffer, folder = "profiles") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(new Error("UPLOAD_FAILED"));
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("DELETE_FAILED");
    }
};
```

## File: utils/errorHandler.js

```js
import {
    errorResponse,
    badRequestResponse,
    unauthorizedResponse,
    conflictResponse,
} from "./responseHandler.js";

export const handleAuthError = (res, error) => {
    const errorMap = {
        USER_ALREADY_EXISTS: () => conflictResponse(res, "User already exists"),
        INVALID_CREDENTIALS: () =>
            unauthorizedResponse(res, "Invalid email or password"),
        REFRESH_TOKEN_REQUIRED: () =>
            badRequestResponse(res, "Refresh token required"),
        INVALID_REFRESH_TOKEN: () =>
            unauthorizedResponse(res, "Invalid refresh token"),
        REFRESH_TOKEN_EXPIRED: () =>
            unauthorizedResponse(res, "Refresh token expired"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Auth error:", error);
        errorResponse(res, "Internal server error");
    }
};

export const handleProfileError = (res, error) => {
    const errorMap = {
        CURRENT_PASSWORD_REQUIRED: () =>
            badRequestResponse(
                res,
                "Current password is required to set new password"
            ),
        INVALID_CURRENT_PASSWORD: () =>
            unauthorizedResponse(res, "Current password is incorrect"),
        USER_NOT_FOUND: () => notFoundResponse(res, "User not found"),
    };

    const handler = errorMap[error.message];
    if (handler) {
        handler();
    } else {
        console.error("Profile error:", error);
        errorResponse(res, "Internal server error");
    }
};
```

## File: utils/jwt.js

```js
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
```

## File: utils/responseHandler.js

```js
export const successResponse = (res, msg, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        msg,
        data,
    });
};

export const errorResponse = (res, msg, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        msg,
        data: null,
    });
};

export const createdResponse = (res, msg, data = null) => {
    return successResponse(res, msg, data, 201);
};

export const badRequestResponse = (res, msg) => {
    return errorResponse(res, msg, 400);
};

export const unauthorizedResponse = (res, msg = "Unauthorized") => {
    return errorResponse(res, msg, 401);
};

export const notFoundResponse = (res, msg = "Resource not found") => {
    return errorResponse(res, msg, 404);
};

export const conflictResponse = (res, msg = "Resource already exists") => {
    return errorResponse(res, msg, 409);
};
```

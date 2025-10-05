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

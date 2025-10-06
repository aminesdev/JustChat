import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { tokenService } from "./tokenService.js";

const saltRounds = parseInt(process.env.ROUNDS) || 12;

export const signupService = async (userData) => {
    const { email, full_name, password } = userData;

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    const password_hash = await bcrypt.hash(password, saltRounds);

    const user = await userRepository.create({
        email,
        full_name,
        password_hash,
    });

    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

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

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

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
    const result = await tokenService.refreshAccessToken(token);
    return result;
};

export const logoutService = async (token) => {
    const result = await tokenService.revokeToken(token);
    return result;
};

export const logoutAllDevicesService = async (userId) => {
    const result = await tokenService.revokeAllUserTokens(userId);
    return result;
};

import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/userRepository.js";
import { tokenService } from "../services/tokenService.js";

// Extract email from GitHub profile
export const getEmailFromGitHubProfile = (profile) => {
    // GitHub might not return email if it's private
    if (profile.emails && profile.emails.length > 0) {
        return profile.emails[0].value;
    }

    // Fallback: use GitHub username to create an email
    if (profile.username) {
        return `${profile.username}@github.com`;
    }

    // Last resort: use profile ID
    return `${profile.id}@github.com`;
};

// Extract full name from GitHub profile
export const getFullNameFromGitHubProfile = (profile) => {
    return profile.displayName || profile.username || "GitHub User";
};

// Extract avatar from GitHub profile
export const getAvatarFromGitHubProfile = (profile) => {
    return profile.photos && profile.photos[0] ? profile.photos[0].value : null;
};

// Generate random password for OAuth users
export const generateRandomPassword = async () => {
    const randomPassword =
        Math.random().toString(36).slice(-16) +
        Math.random().toString(36).slice(-16);
    return await bcrypt.hash(
        randomPassword,
        parseInt(process.env.ROUNDS) || 12
    );
};

// Main OAuth user handler
export const handleGitHubUser = async (profile) => {
    const email = getEmailFromGitHubProfile(profile);

    if (!email) {
        throw new Error("EMAIL_REQUIRED_FOR_OAUTH");
    }

    // Check if user exists
    let user = await userRepository.findByEmail(email);

    if (!user) {
        // Create new user
        const passwordHash = await generateRandomPassword();

        user = await userRepository.create({
            email: email,
            full_name: getFullNameFromGitHubProfile(profile),
            password_hash: passwordHash,
            avatar_url: getAvatarFromGitHubProfile(profile),
            is_online: true,
        });
    } else {
        // Update existing user's online status
        user = await userRepository.update(user.id, {
            is_online: true,
            last_seen: new Date(),
        });
    }

    // Generate tokens
    const { accessToken, refreshToken } = await tokenService.generateAuthTokens(
        user.id
    );

    return {
        user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            avatar_url: user.avatar_url,
            is_online: user.is_online,
            last_seen: user.last_seen,
            created_at: user.created_at,
        },
        accessToken,
        refreshToken,
    };
};

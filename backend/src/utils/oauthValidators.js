export const oauthValidators = {
    // Validate OAuth environment configuration
    validateOAuthConfig: () => {
        const missingVars = [];
        const warnings = [];

        // Required environment variables
        if (!process.env.GITHUB_CLIENT_ID) {
            missingVars.push("GITHUB_CLIENT_ID");
        }

        if (!process.env.GITHUB_CLIENT_SECRET) {
            missingVars.push("GITHUB_CLIENT_SECRET");
        }

        if (!process.env.CLIENT_URL) {
            missingVars.push("CLIENT_URL");
        }

        // Optional but recommended environment variables
        if (!process.env.CLIENT_SUCCESS_REDIRECT) {
            warnings.push("CLIENT_SUCCESS_REDIRECT (default: /chat)");
        }

        if (!process.env.CLIENT_ERROR_REDIRECT) {
            warnings.push("CLIENT_ERROR_REDIRECT (default: /login)");
        }

        // Throw error for missing required variables
        if (missingVars.length > 0) {
            throw new Error(
                `Missing required OAuth environment variables: ${missingVars.join(
                    ", "
                )}`
            );
        }

        return {
            github: {
                enabled: !!process.env.GITHUB_CLIENT_ID,
                clientId: process.env.GITHUB_CLIENT_ID
                    ? "configured"
                    : "missing",
                clientSecret: process.env.GITHUB_CLIENT_SECRET
                    ? "configured"
                    : "missing",
                callbackUrl: "/api/auth/github/callback",
            },
            client: {
                url: process.env.CLIENT_URL,
                successRedirect: process.env.CLIENT_SUCCESS_REDIRECT || "/chat",
                errorRedirect: process.env.CLIENT_ERROR_REDIRECT || "/login",
            },
            warnings: warnings.length > 0 ? warnings : null,
        };
    },

    // Validate GitHub profile structure
    validateGitHubProfile: (profile) => {
        if (!profile) {
            throw new Error("GitHub profile is null or undefined");
        }

        if (!profile.id) {
            throw new Error("GitHub profile missing ID");
        }

        if (!profile.username && !profile.displayName) {
            throw new Error("GitHub profile missing username and display name");
        }

        // Check if we have at least one way to identify the user
        const hasEmail = profile.emails && profile.emails.length > 0;
        const hasUsername = !!profile.username;

        if (!hasEmail && !hasUsername) {
            throw new Error("GitHub profile missing both email and username");
        }

        return true;
    },

    // Validate OAuth callback parameters
    validateCallbackParams: (req) => {
        const { error, error_description, code } = req.query;

        if (error) {
            throw new Error(
                `OAuth provider error: ${error} - ${
                    error_description || "No description"
                }`
            );
        }

        if (!code) {
            throw new Error("Missing authorization code in callback");
        }

        return true;
    },

    // Check if OAuth is properly configured
    isOAuthEnabled: () => {
        try {
            const config = oauthValidators.validateOAuthConfig();
            return config.github.enabled;
        } catch (error) {
            return false;
        }
    },
};

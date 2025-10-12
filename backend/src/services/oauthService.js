import { handleGitHubUser } from "../utils/oauthHelpers.js";
import { oauthValidators } from "../utils/oauthValidators.js";

export const oauthService = {
    // Process GitHub OAuth callback
    processGitHubCallback: async (profile) => {
        try {
            // Validate the GitHub profile before processing
            oauthValidators.validateGitHubProfile(profile);

            const result = await handleGitHubUser(profile);
            return result;
        } catch (error) {
            console.error("OAuth service error:", error);
            throw error;
        }
    },

    // Validate OAuth configuration (delegates to validator)
    validateOAuthConfig: () => {
        return oauthValidators.validateOAuthConfig();
    },

    // Validate callback parameters
    validateCallbackParams: (req) => {
        return oauthValidators.validateCallbackParams(req);
    },

    // Check if OAuth is enabled
    isOAuthEnabled: () => {
        return oauthValidators.isOAuthEnabled();
    },

    // Get OAuth configuration for frontend
    getOAuthConfig: () => {
        const config = oauthValidators.validateOAuthConfig();

        return {
            providers: {
                github: config.github.enabled
                    ? {
                          name: "GitHub",
                          url: "/api/auth/github",
                          enabled: true,
                      }
                    : null,
            },
            client: {
                url: config.client.url,
                successRedirect: config.client.successRedirect,
                errorRedirect: config.client.errorRedirect,
            },
        };
    },
};

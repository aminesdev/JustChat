import passport from "../config/oauth.js";
import { oauthService } from "../services/oauthService.js";
import { successResponse } from "../utils/responseHandler.js";
import { handleOAuthError } from "../utils/errorHandler.js";

// GitHub OAuth initiation
export const githubAuth = passport.authenticate("github", {
    scope: ["user:email"],
});

// GitHub OAuth callback
export const githubCallback = (req, res, next) => {
    try {
        // Validate callback parameters first
        oauthService.validateCallbackParams(req);

        passport.authenticate(
            "github",
            { session: false },
            (err, user, info) => {
                handleOAuthCallback(req, res, err, user, info);
            }
        )(req, res, next);
    } catch (error) {
        console.error("OAuth callback validation error:", error);
        handleOAuthError(res, error);
    }
};

// Handle OAuth callback
const handleOAuthCallback = (req, res, err, user, info) => {
    if (err) {
        console.error("OAuth callback error:", err);
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=oauth_failed&message=${encodeURIComponent(err.message)}`
        );
    }

    if (!user) {
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=authentication_failed`
        );
    }

    try {
        const config = oauthService.validateOAuthConfig();

        // Redirect to frontend with tokens as URL parameters
        const redirectUrl = `${config.client.url}${
            config.client.successRedirect
        }?accessToken=${user.accessToken}&refreshToken=${
            user.refreshToken
        }&user=${encodeURIComponent(JSON.stringify(user.user))}`;

        res.redirect(redirectUrl);
    } catch (redirectError) {
        console.error("Redirect error:", redirectError);
        res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=redirect_failed`
        );
    }
};

// Get OAuth providers configuration
export const getOAuthProviders = (req, res) => {
    try {
        const config = oauthService.getOAuthConfig();

        successResponse(res, "OAuth providers retrieved successfully", config);
    } catch (error) {
        handleOAuthError(res, error);
    }
};

// Check OAuth health status
export const getOAuthHealth = (req, res) => {
    try {
        const config = oauthService.validateOAuthConfig();

        successResponse(res, "OAuth configuration is healthy", {
            healthy: true,
            github: config.github.enabled,
            clientUrl: config.client.url,
            successRedirect: config.client.successRedirect,
            errorRedirect: config.client.errorRedirect,
            timestamp: new Date().toISOString(),
            warnings: config.warnings,
        });
    } catch (error) {
        successResponse(res, "OAuth configuration has issues", {
            healthy: false,
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
};

// Check if OAuth is enabled
export const getOAuthStatus = (req, res) => {
    try {
        const isEnabled = oauthService.isOAuthEnabled();

        successResponse(res, "OAuth status retrieved", {
            enabled: isEnabled,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        handleOAuthError(res, error);
    }
};

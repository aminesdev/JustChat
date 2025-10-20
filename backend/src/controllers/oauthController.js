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
    console.log("OAuth callback started");

    if (err) {
        console.error("OAuth callback error:", err);
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=oauth_failed&message=${encodeURIComponent(err.message)}`
        );
    }

    if (!user) {
        console.error("No user returned from OAuth");
        return res.redirect(
            `${process.env.CLIENT_URL}${
                process.env.CLIENT_ERROR_REDIRECT || "/login"
            }?error=authentication_failed`
        );
    }

    console.log("OAuth successful for user:", user.user?.email);

    try {
        // Debug: Check environment variables directly
        console.log("Environment variables check:");
        console.log("CLIENT_URL:", process.env.CLIENT_URL);
        console.log(
            "CLIENT_SUCCESS_REDIRECT:",
            process.env.CLIENT_SUCCESS_REDIRECT
        );
        console.log(
            "CLIENT_ERROR_REDIRECT:",
            process.env.CLIENT_ERROR_REDIRECT
        );

        // Get config from service
        const config = oauthService.validateOAuthConfig();
        console.log("OAuth service config:");
        console.log("config.client.url:", config.client.url);
        console.log(
            "config.client.successRedirect:",
            config.client.successRedirect
        );
        console.log(
            "config.client.errorRedirect:",
            config.client.errorRedirect
        );

        // Use environment variables directly to ensure we have the latest values
        const clientUrl = process.env.CLIENT_URL;
        const successRedirect =
            process.env.CLIENT_SUCCESS_REDIRECT || "/oauth-callback";

        console.log("Using redirect values:");
        console.log("clientUrl:", clientUrl);
        console.log("successRedirect:", successRedirect);

        const redirectUrl = `${clientUrl}${successRedirect}?accessToken=${
            user.accessToken
        }&refreshToken=${user.refreshToken}&user=${encodeURIComponent(
            JSON.stringify(user.user)
        )}`;

        console.log("Final redirect URL:", redirectUrl);
        console.log(
            "User tokens generated - accessToken length:",
            user.accessToken?.length
        );
        console.log("User data:", {
            id: user.user?.id,
            email: user.user?.email,
            name: user.user?.full_name,
        });

        res.redirect(redirectUrl);
    } catch (redirectError) {
        console.error("Redirect error:", redirectError);
        console.error("Redirect error stack:", redirectError.stack);

        // Fallback to environment variables for error redirect
        const errorRedirectUrl = `${process.env.CLIENT_URL}${
            process.env.CLIENT_ERROR_REDIRECT || "/login"
        }?error=redirect_failed`;

        console.log("Error redirect URL:", errorRedirectUrl);
        res.redirect(errorRedirectUrl);
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

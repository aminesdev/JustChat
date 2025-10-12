import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { handleGitHubUser } from "../utils/oauthHelpers.js";
import { userRepository } from "../repositories/userRepository.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userRepository.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/oauth/github/callback",
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile received:", {
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    emails: profile.emails,
                    photos: profile.photos,
                });

                const user = await handleGitHubUser(profile);
                done(null, user);
            } catch (error) {
                console.error("GitHub OAuth error:", error);
                done(error, null);
            }
        }
    )
);

export default passport;

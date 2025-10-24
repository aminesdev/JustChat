import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with better connection settings
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 30000, // 30 seconds timeout
    secure: true,
});

// Store the configuration state
let cloudinaryConfigured = false;

export async function testCloudinary() {
    try {
        const result = await cloudinary.api.ping();
        console.log("Cloudinary configuration successful!");
        console.log("Status:", result.status);
        cloudinaryConfigured = true;
        return true;
    } catch (error) {
        console.log("Cloudinary configuration failed:");
        console.log("Error:", error.message);
        cloudinaryConfigured = false;
        return false;
    }
}

// Reset function to reinitialize if needed
export async function resetCloudinary() {
    try {
        // Reconfigure cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
            timeout: 30000,
            secure: true,
        });

        const result = await cloudinary.api.ping();
        cloudinaryConfigured = true;
        console.log("Cloudinary reset successful");
        return true;
    } catch (error) {
        cloudinaryConfigured = false;
        console.log("Cloudinary reset failed:", error.message);
        return false;
    }
}

export function isCloudinaryConfigured() {
    return cloudinaryConfigured;
}

export default cloudinary;

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
        throw new Error("CLOUDINARY_CONFIG_ERROR");
    }
}

export default cloudinary;

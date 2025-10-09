import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import { testCloudinary } from "./config/cloudinary.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        console.log("Starting Chat App Server...");

        // Connect to database
        await connectDb();
        console.log("Database connected successfully");

        // Test Cloudinary configuration
        await testCloudinary();
        console.log("Cloudinary configured successfully");

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(
                `API Documentation: http://localhost:${PORT}/api-docs`
            );
            console.log(`Health Check: http://localhost:${PORT}/health`);
            console.log(
                `Environment: ${process.env.NODE_ENV || "development"}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

start();

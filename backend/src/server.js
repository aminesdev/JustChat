import app from "./app.js";
import dotenv from "dotenv";
import {connectDb} from "./config/database.js";
import {testCloudinary} from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT;

async function start() {
    await connectDb();
    await testCloudinary();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
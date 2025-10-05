import app from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
dotenv.config();

const PORT = process.env.PORT;

async function start() {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
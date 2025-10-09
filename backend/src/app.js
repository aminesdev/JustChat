import express from "express";
import routes from "./routes/index.js";
import { specs, swaggerUi } from "./config/swagger.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Chat App API Documentation",
    })
);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Chat App API is running",
        data: {
            timestamp: new Date().toISOString(),
            version: "1.0.0",
        },
    });
});

app.use("/api", routes);

export default app;

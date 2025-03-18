import express from "express";
import cors from "cors";
import { config } from "../config";
import { logger } from "./utils";
import movieRoutes from "./routes/movies"
import {errorHandler} from "./middleware";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check
app.get("/health", (req, res) => {
    res.json({ status: "success", message: "API is healthy" });
});

// API Routes
app.use("/movies",movieRoutes);

app.use(errorHandler);

const server = app.listen(config.port, () => {
    logger.info(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
    logger.info("Shutting down server...");
    server.close(() => {
        logger.info("Server closed.");
        process.exit(0);
    });
});
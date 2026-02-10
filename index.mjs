import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRouter from "./api/index.mjs";
import database from "./database.mjs";

const PORT = process.env.PORT || 3000;

// Database connection handlers
database.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

database.once("open", () => {
  console.log("Successfully connected to database");
});

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Open Tailor API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/measurements", apiRouter);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Open Tailor API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      measurements: "/api/measurements",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

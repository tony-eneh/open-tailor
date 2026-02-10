import express from "express";
import {
  getAllMeasurements,
  getMeasurementById,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  insertDemoMeasurements,
} from "./controller.mjs";

const router = express.Router();

// GET all measurements with query support
router.get("/", getAllMeasurements);

// GET single measurement by ID
router.get("/:id", getMeasurementById);

// POST create new measurement
router.post("/", createMeasurement);

// PUT update measurement by ID
router.put("/:id", updateMeasurement);

// DELETE measurement by ID
router.delete("/:id", deleteMeasurement);

// POST demo data for testing
router.post("/demo/load", insertDemoMeasurements);

export default router;

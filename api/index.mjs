import express from "express";
import {
  getMeasurement,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  insertDemoMeasurements,
} from "./controller.mjs";

const router = express.Router();

router.get("/", getMeasurement);

router.post("/", createMeasurement);

router.put("/", updateMeasurement);

router.delete("/", deleteMeasurement);

router.post("/test", insertDemoMeasurements);

export default router;

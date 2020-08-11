import express from "express";
import {
  getMeasurement,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
} from "./controller.mjs";

const router = express.Router();

router.get("/", getMeasurement);

router.post("/", createMeasurement);

router.put("/", updateMeasurement);

router.delete("/", deleteMeasurement);

export default router;

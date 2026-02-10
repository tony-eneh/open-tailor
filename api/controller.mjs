import Model from "./model.mjs";
import { measurements } from "../test/demo-data.mjs";
import aqp from "api-query-params";

// GET all measurements with filtering, pagination, sorting
export const getAllMeasurements = async (req, res) => {
  try {
    const { filter, skip, limit, sort, projection } = aqp(req.query);
    
    const results = await Model.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();

    const total = await Model.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: results,
      pagination: {
        total,
        limit,
        skip,
        count: results.length,
      },
      message: "Measurements retrieved successfully",
    });
  } catch (err) {
    console.error("Error fetching measurements:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve measurements",
      error: err.message,
    });
  }
};

// GET single measurement by ID
export const getMeasurementById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid measurement ID format",
      });
    }

    const measurement = await Model.findById(id);

    if (!measurement) {
      return res.status(404).json({
        success: false,
        message: "Measurement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: measurement,
      message: "Measurement retrieved successfully",
    });
  } catch (err) {
    console.error("Error fetching measurement:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve measurement",
      error: err.message,
    });
  }
};

// POST create new measurement
export const createMeasurement = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Request body must be a valid JSON object",
      });
    }

    // Validate required fields
    if (!req.body.email || !req.body.gender) {
      return res.status(400).json({
        success: false,
        message: "Email and gender are required fields",
      });
    }

    const newMeasurement = new Model(req.body);
    const savedMeasurement = await newMeasurement.save();

    return res.status(201).json({
      success: true,
      data: savedMeasurement,
      message: "Measurement created successfully",
    });
  } catch (err) {
    console.error("Error creating measurement:", err);

    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A measurement with this email already exists",
      });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create measurement",
      error: err.message,
    });
  }
};

// PUT update measurement by ID
export const updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid measurement ID format",
      });
    }

    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Request body must be a valid JSON object",
      });
    }

    const updatedMeasurement = await Model.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMeasurement) {
      return res.status(404).json({
        success: false,
        message: "Measurement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedMeasurement,
      message: "Measurement updated successfully",
    });
  } catch (err) {
    console.error("Error updating measurement:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update measurement",
      error: err.message,
    });
  }
};

// DELETE measurement by ID
export const deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid measurement ID format",
      });
    }

    const deletedMeasurement = await Model.findByIdAndDelete(id);

    if (!deletedMeasurement) {
      return res.status(404).json({
        success: false,
        message: "Measurement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedMeasurement,
      message: "Measurement deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting measurement:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete measurement",
      error: err.message,
    });
  }
};

// POST insert demo measurements for testing
export const insertDemoMeasurements = async (req, res) => {
  try {
    const result = await Model.insertMany(measurements, { ordered: false });

    return res.status(201).json({
      success: true,
      data: result,
      message: `Successfully inserted ${result.length} demo measurements`,
    });
  } catch (err) {
    console.error("Error inserting demo data:", err);

    // If some documents were inserted despite errors
    if (err.insertedDocs && err.insertedDocs.length > 0) {
      return res.status(207).json({
        success: true,
        data: err.insertedDocs,
        message: `Partially successful: ${err.insertedDocs.length} measurements inserted`,
        errors: err.writeErrors?.map((e) => e.errmsg) || [],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to insert demo data",
      error: err.message,
    });
  }
};

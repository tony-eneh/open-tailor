import "dotenv/config";
import mongoose from "mongoose";
import Model from "../api/model.mjs";
import { measurements } from "./demo-data.mjs";

const options = {
  dbName: "open-tailor",
};

async function populateDatabase() {
  try {
    // Connect to database
    await mongoose.connect(process.env.DB_URL, options);
    console.log("✓ Connected to database");

    // Clear existing data
    await Model.deleteMany({});
    console.log("✓ Cleared existing measurements");

    // Insert demo data
    const result = await Model.insertMany(measurements);
    console.log(`✓ Inserted ${result.length} demo measurements`);

    // Display inserted data
    console.log("\nInserted measurements:");
    result.forEach((measurement, index) => {
      console.log(
        `  ${index + 1}. ${measurement.email} (${measurement.gender}, ${measurement.unit})`
      );
    });

    console.log("\n✓ Demo data loaded successfully!");
  } catch (error) {
    console.error("✗ Error loading demo data:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("✓ Database connection closed");
  }
}

populateDatabase();

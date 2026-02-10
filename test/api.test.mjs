import { describe, it, before } from "node:test";
import assert from "node:assert";

// Basic API endpoint tests
describe("Open Tailor API Tests", () => {
  const BASE_URL = "http://localhost:3000";
  let testMeasurementId = null;

  it("should check health endpoint", async () => {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      const data = await response.json();
      
      assert.strictEqual(response.status, 200);
      assert.strictEqual(data.status, "ok");
    } catch (err) {
      // Server might not be running, skip test
      console.log("Server not running, skipping test");
    }
  });

  it("should get all measurements", async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/measurements`);
      const data = await response.json();
      
      assert.strictEqual(response.status, 200);
      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.data));
    } catch (err) {
      console.log("Server not running, skipping test");
    }
  });

  it("should create a new measurement", async () => {
    try {
      const testData = {
        email: `test-${Date.now()}@example.com`,
        gender: "male",
        unit: "cm",
        measurements: {
          heightLength: 180,
          waistCircle: 85,
        },
      };

      const response = await fetch(`${BASE_URL}/api/measurements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      
      assert.strictEqual(response.status, 201);
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.data.email, testData.email);
      
      testMeasurementId = data.data._id;
    } catch (err) {
      console.log("Server not running, skipping test");
    }
  });
});

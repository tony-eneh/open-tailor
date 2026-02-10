#!/usr/bin/env node

/**
 * Integration test script for Open Tailor API
 * This script tests all major API endpoints
 */

const BASE_URL = process.env.API_URL || "http://localhost:3000";

async function testEndpoint(name, method, url, body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✓ ${name}: PASS (${response.status})`);
      return { success: true, data, status: response.status };
    } else {
      console.log(`✗ ${name}: FAIL (${response.status}) - ${data.message}`);
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    console.log(`✗ ${name}: ERROR - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log("Starting Open Tailor API Integration Tests\n");
  console.log(`Base URL: ${BASE_URL}\n`);

  let createdId = null;
  let passCount = 0;
  let failCount = 0;

  // Test 1: Health check
  const test1 = await testEndpoint(
    "Health Check",
    "GET",
    `${BASE_URL}/health`
  );
  test1.success ? passCount++ : failCount++;

  // Test 2: Get all measurements
  const test2 = await testEndpoint(
    "Get All Measurements",
    "GET",
    `${BASE_URL}/api/measurements`
  );
  test2.success ? passCount++ : failCount++;

  // Test 3: Create measurement
  const test3 = await testEndpoint(
    "Create Measurement",
    "POST",
    `${BASE_URL}/api/measurements`,
    {
      email: `test-${Date.now()}@example.com`,
      gender: "male",
      unit: "cm",
      measurements: {
        heightLength: 180,
        waistCircle: 85,
      },
    }
  );
  if (test3.success) {
    passCount++;
    createdId = test3.data.data._id;
    console.log(`  Created ID: ${createdId}`);
  } else {
    failCount++;
  }

  // Test 4: Get by ID (if created)
  if (createdId) {
    const test4 = await testEndpoint(
      "Get Measurement by ID",
      "GET",
      `${BASE_URL}/api/measurements/${createdId}`
    );
    test4.success ? passCount++ : failCount++;
  }

  // Test 5: Update measurement (if created)
  if (createdId) {
    const test5 = await testEndpoint(
      "Update Measurement",
      "PUT",
      `${BASE_URL}/api/measurements/${createdId}`,
      {
        measurements: {
          waistCircle: 87,
        },
      }
    );
    test5.success ? passCount++ : failCount++;
  }

  // Test 6: Test duplicate email (should fail with 409)
  const test6 = await testEndpoint(
    "Duplicate Email (Expected Failure)",
    "POST",
    `${BASE_URL}/api/measurements`,
    {
      email: "john.doe@example.com",
      gender: "male",
    }
  );
  // This should fail with 409, so we expect success=false
  if (!test6.success && test6.status === 409) {
    console.log(`  Note: Correctly rejected duplicate email`);
    passCount++;
  } else {
    failCount++;
  }

  // Test 7: Test invalid email (should fail with 400)
  const test7 = await testEndpoint(
    "Invalid Email (Expected Failure)",
    "POST",
    `${BASE_URL}/api/measurements`,
    {
      email: "invalid-email",
      gender: "male",
    }
  );
  // This should fail with 400
  if (!test7.success && test7.status === 400) {
    console.log(`  Note: Correctly rejected invalid email`);
    passCount++;
  } else {
    failCount++;
  }

  // Test 8: Test filtering
  const test8 = await testEndpoint(
    "Filter by Gender",
    "GET",
    `${BASE_URL}/api/measurements?filter[gender]=male`
  );
  test8.success ? passCount++ : failCount++;

  // Test 9: Test pagination
  const test9 = await testEndpoint(
    "Pagination (limit=2)",
    "GET",
    `${BASE_URL}/api/measurements?limit=2`
  );
  if (test9.success && test9.data.data.length <= 2) {
    passCount++;
  } else {
    failCount++;
  }

  // Test 10: Delete measurement (if created)
  if (createdId) {
    const test10 = await testEndpoint(
      "Delete Measurement",
      "DELETE",
      `${BASE_URL}/api/measurements/${createdId}`
    );
    test10.success ? passCount++ : failCount++;
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("Test Summary");
  console.log("=".repeat(50));
  console.log(`✓ Passed: ${passCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Total: ${passCount + failCount}`);
  console.log(`Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);
  console.log("=".repeat(50));

  if (failCount === 0) {
    console.log("\n🎉 All tests passed!");
    process.exit(0);
  } else {
    console.log("\n⚠️  Some tests failed");
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

// Import the 'supertest' library, which is used for testing HTTP requests.
const request = require("supertest");

// Import the Express application from "../server" (assuming it's the server being tested).
const app = require("../server");

// This block of code is defining a test suite using the 'describe' function.
describe("GET /search", () => {
  // First test case within the test suite.
  it("responds with JSON", async () => {
    // Send an HTTP GET request to the "/search" endpoint with query parameters "term" and "media."
    const response = await request(app).get("/search?term=katy&media=music");

    // Expect that the response status code should be 200 (OK).
    expect(response.status).toBe(200);

    // Expect that the response content type should match a JSON type (e.g., "application/json").
    expect(response.type).toMatch(/json/);
  });

  // Second test case within the same test suite.
  it("responds with search results", async () => {
    // Send another HTTP GET request to the "/search" endpoint with the same query parameters.
    const response = await request(app).get("/search?term=katy&media=music");

    // Expect that the response status code should be 200 (OK) once again.
    expect(response.status).toBe(200);

    // Expect that the response body (parsed JSON) should have a property called "results."
    expect(response.body).toHaveProperty("results");
  });
});

const request = require("supertest");
const express = require("express");
const app = express();

// Import the router
const router = require("../../../src/routes/v2");

// Mount the router on the app
app.use("/api", router);

describe("API Routes", () => {
  it("should retrieve all records from the model", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });

  it("should retrieve a single record from the model", async () => {
    const id = "1"; // Provide a valid ID for testing
    const response = await request(app).get(`/api/${id}`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });

  it("should create a new record in the model", async () => {
    const payload = {
      name: "reedvogt_user",
      username: "reedvogt_user",
      password: "pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ",
      email: "readvogt@gmail.com",
    };
    const response = await request(app).post("/api").send(payload);
    expect(response.status).toBe(201);
    // Add more assertions to validate the response body, if needed
    expect(response.body).toEqual(expect.objectContaining(payload));
  });

  it("should update a record in the model", async () => {
    const id = "1"; // Provide a valid ID for testing
    const payload = {
      name: "reedvogt_user",
      username: "reedvogt_user",
      password: "pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ",
      email: "readvogt@gmail.com",
    };
    const response = await request(app).put(`/api/${id}`).send(payload);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
    expect(response.body).toEqual(expect.objectContaining(payload));
  });

  it("should delete a record from the model", async () => {
    const id = "1"; // Provide a valid ID for testing
    const response = await request(app).delete(`/api/${id}`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });
});

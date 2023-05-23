const request = require("supertest");
const express = require("express");
const app = express();

// Import the router
const router = require("../../../src/routes/v1");

// Mount the router on the app
app.use("/api", router);

describe("API Routes", () => {
  it("should create a new entry", async () => {
    const modelName = "Users";
    const payload = {
      name: "reedvogt_user",
      username: "reedvogt_user",
      password: "pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ",
      email: "readvogt@gmail.com",
    };
    const response = await request(app).post(`/api/${modelName}`).send(payload);
    expect(response.status).toBe(201);
    // Optionally, you can add more assertions to validate the response body
    expect(response.body).toEqual(expect.objectContaining(payload));
  });

  it("should retrieve all records", async () => {
    const modelName = "Users";
    const response = await request(app).get(`/api/${modelName}`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });

  it("should retrieve a single record", async () => {
    const modelName = "Users";
    const id = "1";
    const response = await request(app).get(`/api/${modelName}/${id}`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });

  it("should update part of a record", async () => {
    const modelName = "Users";
    const id = "1";
    const patchData = {
      name: "reedvogt_user",
      username: "reedvogt_user",
      password: "pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ",
      email: "readvogt@gmail.com",
    };
    const response = await request(app)
      .patch(`/api/${modelName}/${id}`)
      .send(patchData);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
    expect(response.body).toEqual(expect.objectContaining(patchData));
  });

  it("should update an entire record", async () => {
    const modelName = "Users";
    const id = "1";
    const payload = {
      name: "reedvogt_user",
      username: "reedvogt_user",
      password: "pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ",
      email: "readvogt@gmail.com",
    };
    const response = await request(app)
      .put(`/api/${modelName}/${id}`)
      .send(payload);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
    expect(response.body).toEqual(expect.objectContaining(payload));
  });

  it("should delete a record", async () => {
    const modelName = "Users";
    const id = "1";
    const response = await request(app).delete(`/api/${modelName}/${id}`);
    expect(response.status).toBe(200);
    // Add more assertions to validate the response body, if needed
  });
});

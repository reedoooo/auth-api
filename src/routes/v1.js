"use strict";

// Imports
const express = require("express");
const dataModules = require('../models');

// Router setup
const router = express.Router();

// Middleware to determine the data model based on the request parameter
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName]; // Add the model to the request object
    next(); // Move to the next middleware
  } else {
    next('Invalid Model'); // Send error if model is not valid
  }
});

// Handler for retrieving all records from the model
async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords); // Respond with status 200 and the retrieved records
}

// Handler for retrieving a single record from the model
async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord); // Respond with status 200 and the retrieved record
}

// Handler for creating a new record in the model
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json( newRecord ); // Respond with status 201 and the created record
}

// Handler for updating a record in the model
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord); // Respond with status 200 and the updated record
}

// Handler for deleting a record from the model
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord); // Respond with status 200 and the deleted record
}
router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);
// // Define router paths and attach handlers
// router.post("/", handleCreate);
// router.get("/", handleGetAll);
// router.get("/:id", handleGetOne);
// router.put("/:id", handleUpdate); // PUT usually denotes complete update of a record
// router.patch("/:id", handleUpdate); // PATCH denotes partial update of a record
// router.delete("/:id", handleDelete);

// Export the router for use elsewhere in the application
module.exports = router;

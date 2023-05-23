'use strict';

// Import required modules
const express = require('express');
const dataModules = require('../models'); // Our data models
const { users } = require('../auth/models/index'); // User model for authentication
const bearer = require('../auth/middleware/bearer'); // Middleware for Bearer authentication
const acl = require('../auth/middleware/acl'); // Middleware for Access Control Lists

// Create a new Express Router
const router = express.Router();

// Router parameter middleware that determines the data model based on the request parameter
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName]; // Add the model to the request object
    next(); // Move to the next middleware
  } else {
    next('Invalid Model'); // Send error if model is not valid
  }
});

// Handler for creating new entries
const handleCreate = async (req, res) => {
  let newRecord = await req.model.create(req.body)
  res.status(201).json(newRecord) // Return status 201 and the new record
}

// Handler for retrieving a single record
const handleGetOne = async (req, res) => {
  let singleRecord = await req.model.get(req.params.id);
  res.status(200).json(singleRecord) // Return status 200 and the requested record
};

// Handler for retrieving all records
const handleGetAll = async (req, res) => {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords) // Return status 200 and all records
}

// Handler for updating part of a record
const handleUpdatePart = async (req, res) => {
  res.status(200).send('Successful PATCH request to protected route')
}

// Handler for updating an entire record
const handleUpdateWhole = async (req, res) => {
  let updatedRecord = await req.model.update(req.params.id, req.body);
  res.status(200).json(updatedRecord); // Return status 200 and the updated record
}

// Handler for deleting a record
const handleDelete = async (req, res) => {
  let deletedRecord = await req.model.delete(req.params.id);
  res.status(200).json(deletedRecord); // Return status 200 and the deleted record
}

// Define router paths and attach handlers and middleware
router.post('/:model', bearer, acl('create'), handleCreate )
router.get('/:model', bearer, acl('read'), handleGetAll )
router.get('/:model/:id', bearer, acl('read'), handleGetOne )
router.patch('/:model/:id', bearer, acl('update'), handleUpdatePart )
router.put('/:model/:id', bearer, acl('update'), handleUpdateWhole )
router.delete('/:model/:id', bearer, acl('delete'), handleDelete )

// Export the router for use elsewhere in the application
module.exports = router;

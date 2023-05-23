'use strict';

// Importing necessary packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger.js');

const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');

const authRoutes = require('./auth/authRoutes.js');
const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

// Create an instance of express
const app = express();

// Add middleware functions
app.use(logger); // Log every request to the console

// v1Routes handle CRUD for 'cards' and 'clothes' models
app.use('/api/v1', v1Routes)


// Allow the app to use CORS (Cross Origin Resource Sharing) to enable interaction with other websites
app.use(cors());
app.use(morgan('dev'));

// Process JSON input and put the data on req.body for further handling
app.use(express.json());

// Process FORM input and put the data on req.body for further handling
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in authRoutes.js
app.use(authRoutes);
app.use('/api/v2', v2Routes);


// Catchalls
app.use('*', notFoundHandler)

app.use(errorHandler);

// app.use(errorHandler, (err, req, res, next) => {
//   res.status(500).json({
//     error: err,
//     message: err.message,
//     path: req.path,
//     query: req.query,
//     params: req.params,
//   });
// });

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
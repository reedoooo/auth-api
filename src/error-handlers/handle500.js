'use strict';

const handle500 = (err, request, response, next) => {
  console.error('SERVER ERROR: ', err);
  response.status(500).send('Missing value for \'name\' query');
};

module.exports = handle500;
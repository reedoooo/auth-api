'use strict';

const handle404 = (err, request, response, next) => {
  if (!request.url.includes('/cards') || !request.url.includes('/team') || !request.url.includes('/teammate')) {
    err.message = 'Invalid request route';
    response.status(404).send(err);    
  }
  else if (
    request.method !== 'POST' || 
    request.method !== 'GET' || 
    request.method !== 'PUT' || 
    request.method !== 'PATCH' ||
    request.method !== 'DELETE'
  ) {
    err.message = 'Invalid request method';
    response.status(404).send(err);
  }
  else {
    next();   
  }

};

module.exports = handle404;
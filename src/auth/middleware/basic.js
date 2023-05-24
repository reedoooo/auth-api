'use strict';

// Import the base-64 module for decoding base64 strings
const base64 = require('base-64');

// Import the users model from the models directory
const { users } = require('../models');


// Export a middleware function for basic authentication
module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(user, pass)
    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
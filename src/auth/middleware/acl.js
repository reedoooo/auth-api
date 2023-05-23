'use strict';

// This middleware function will be used to check the capabilities of the user
// against the capability required for the route
function Permissions(capability) {
  return (req, res, next) => {

    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }

  }

}

// Export the middleware function
module.exports = Permissions;
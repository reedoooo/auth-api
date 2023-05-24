'use strict';

// Import necessary modules
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const jwt = require('jsonwebtoken'); // jwt for token generation and verification

// Check if secret is available in environment variables. If not, use a default value.
const SECRET = process.env.SECRET || 'secretstring';

// Define the user schema
const userSchema = (sequelize, DataTypes) => {

  // Define the User model with sequelize
  const model = sequelize.define('User', {
    // Define the properties of the User model
    username: { type: DataTypes.STRING, allowNull: false, unique: true }, // username must be unique and not null
    password: { type: DataTypes.STRING, allowNull: false }, // password must not be null
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user'}, // user role

    // Define a virtual token property that generates a JSON Web Token when accessed
    token: { 
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, { expiresIn: '0.5h' }); // generate a token that expires in 30 minutes
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET); // generate a token
        return token;
      }
    },

    // Define a virtual capabilities property that returns a list of capabilities based on the user's role
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role]; // return capabilities based on the role
      }
    }
  });

  // Before creating a new user, hash the password
  model.beforeCreate(async (user) => {
    try {
      let hashedPass = await bcrypt.hash(user.password, 10); // hash password
      user.password = hashedPass; // replace plain password with hashed password
    } catch (err) {

      throw err; // throw any error
    }
  });

  // Define a method to authenticate user using username and password
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } }); // find user by username
    const valid = await bcrypt.compare(password, user.password); // compare entered password with stored hashed password
    if (valid) { return user; } // if password is valid, return user
    throw new Error('Invalid User'); // if not valid, throw an error
  };

  // Define a method to authenticate user using token
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET); // verify token
      const user = await this.findOne({ where: { username: parsedToken.username } }); // find user by username in token
      if (user) {
        return user; // if user is found, return user
      } else {
        throw new Error("User Not Found"); // if user is not found, throw an error
      }
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token'); // if token is invalid, throw an error
      } else {
        console.error(e.message);
        throw e; // throw any other error
      }
     }
  };

  // Return the defined model
  return model;
};

// Export the userSchema
module.exports = userSchema;

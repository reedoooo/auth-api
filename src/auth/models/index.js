'use strict';

const userSchema = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:testmemory;';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  userDB: sequelize,
  users: userSchema(sequelize, DataTypes),
}
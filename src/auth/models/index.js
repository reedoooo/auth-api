// 'use strict';

// require('dotenv').config();
// const { Sequelize, DataTypes } = require('sequelize');
// const userSchema = require('./users.js');

// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:testmemory;';

// const sequelize = new Sequelize(DATABASE_URL, {
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// // Test the connection to the database
// console.log('DATABASE_URL:', DATABASE_URL);
// (async () => {
//   try {
//     await sequelize.authenticate();
//     if (process.env.NODE_ENV !== 'test') {
//       console.log('Connection to the database has been established successfully.');
//     }
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();


// module.exports = {
//   db: sequelize,
//   users: userSchema(sequelize, DataTypes),
// };
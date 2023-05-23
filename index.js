"use strict";

require("dotenv").config();

const server = require('./src/server');
const PORT = process.env.PORT || 3001
const { db } = require('./src/auth/models/index');
const { cardsAndClothesDB } = require('./src/models/index');
 
console.log("db", db);
// Start up DB Server
db
  .sync()
  .then(async () => {
    await cardsAndClothesDB.sync();
  })
  .then(() => {
    server.start(PORT);
  });

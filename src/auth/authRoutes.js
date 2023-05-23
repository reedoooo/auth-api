"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("./models");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");
const permissions = require("./middleware/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
  // try {
  //   if (!req.user) {
  //     throw new Error("User Not Found");
  //   }
  //   res.status(200).json({ user: req.user, token: req.user.token });
  // } catch (e) {
  //   res
  //     .status(e.message === "User Not Found" ? 404 : 500)
  //     .send(e.message === "User Not Found" ? "User not found" : e);
  //   next(e);
  // }
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

// authRouter.get(
//   "/users",
//   bearerAuth,
//   permissions("delete"),
//   async (req, res, next) => {
//     try {
//       const list = (await users.findAll({})).map((user) => user.username);
//       res.status(200).json(list);
//     } catch (e) {
//       console.error(e);
//       next(e);
//     }
//   }
// );

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;

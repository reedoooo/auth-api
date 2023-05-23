"use strict";

const express = require('express');
// const sinon = require('sinon');
const request = require('supertest');
const bearer = require("../../../../src/auth/middleware/bearer");
const { db, users } = require("../../../../src/auth/models/index");

const app = express();
app.use(express.json());
app.use(bearer);
app.get('/test', (req, res) => res.status(200).send('Passed'));

let userInfo = {
  admin: { username: "admin", password: "password" }
};

beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});

afterAll(async () => {
  await db.drop();
});

describe('Bearer Middleware', () => {
  afterEach(() => {
    if (users.authenticateToken.restore) users.authenticateToken.restore();
  });

  it('Passes if the token is valid', async () => {
    sinon.stub(users, 'authenticateToken').resolves(userInfo.admin);
    const res = await request(app).get('/test').set('Authorization', 'Bearer testtoken').expect(200);
    expect(res.text).toBe('Passed');
  });

  it('Fails if the token is invalid', async () => {
    sinon.stub(users, 'authenticateToken').throws();
    const res = await request(app).get('/test').set('Authorization', 'Bearer invalidtoken').expect(403);
    expect(res.text).toBe('Invalid Login');
  });
});

// 'use strict';

// const request = require('supertest');
// const express = require('express');
// const sinon = require('sinon');
// const bearer = require("../../../../src/auth/middleware/bearer");
// const { userDB, users } = require("../../../../src/auth/models/index");
// // const jwt = require("jsonwebtoken");
// // Create express app

// const app = express();
// app.use(express.json());
// app.use(bearer);

// // Define a route for testing
// app.get('/test', (req, res) => {
//   res.status(200).send('Passed');
// });

// // Tests
// describe('Bearer Middleware', () => {
//   afterEach(() => {
//     if (users.authenticateToken.restore) users.authenticateToken.restore();
//   });

//   it('Passes if the token is valid', async () => {
//     const user = { username: 'test', password: 'test', token: 'testtoken' };
//     sinon.stub(users, 'authenticateToken').resolves(user);
//     const { text } = await request(app).get('/test').set('Authorization', 'Bearer testtoken').expect(200);
//     expect(text).toBe('Passed');
//   });

//   it('Fails if the token is invalid', async () => {
//     sinon.stub(users, 'authenticateToken').throws();
//     const { text } = await request(app).get('/test').set('Authorization', 'Bearer invalidtoken').expect(403);
//     expect(text).toBe('Invalid Login');
//   });
// });

// "use strict";

// process.env.SECRET = "TEST_SECRET";

// const bearer = require("../../../../src/auth/middleware/bearer");
// const { userDB, users } = require("../../../../src/auth/models/index");
// const jwt = require("jsonwebtoken");

// let userInfo = {
//   admin: { username: "admin", password: "password" },
// };

// // Pre-load our database with fake users
// beforeAll(async () => {
//   await userDB.sync();
//   await users.create(userInfo.admin);
// });
// afterAll(async () => {
//   await userDB.drop();
// });

// describe("Auth Middleware", () => {
//   // Mock the express req/res/next that we need for each middleware call
//   const req = {};
//   const res = {
//     status: jest.fn(() => res),
//     send: jest.fn(() => res),
//     json: jest.fn(() => res),
//   };
//   const next = jest.fn();

//   describe("user authentication", () => {
//     // Update for bearer-auth-middleware.test.js
//     test("fails a login for a user (admin) with an incorrect token", async () => {
//       const req = {
//         headers: {
//           authorization: "Bearer incorrecttoken",
//         },
//       };
//       const res = {
//         status: jest.fn(() => res),
//         send: jest.fn(),
//       };
//       const next = jest.fn();

//       await bearer(req, res, next);

//       expect(next).toHaveBeenCalledTimes(1);
//       expect(next).toHaveBeenCalledWith(
//         expect.objectContaining({ message: "Invalid token" })
//       );
//       expect(res.status).toHaveBeenCalledWith(403); // Expecting a 401 status code
//       expect(res.send).toHaveBeenCalled();
//     });

//     test("logs in a user with a proper token", async () => {
//       const user = { username: "admin", password: "password" }; // Include the password or any other required fields
//       const token = jwt.sign(user, process.env.SECRET);

//       req.headers = {
//         authorization: `Bearer ${token}`,
//       };

//       await bearer(req, res, next);

//       expect(next).toHaveBeenCalledWith();
//     });
//   });
// });

'use strict';

process.env.SECRET = "TEST_SECRET";

const base64 = require('base-64');
const basic = require('../../../../src/auth/middleware/basic');
const { db, users } = require('../../../../src/auth/models/index');

let userInfo = {
  admin: { username: 'admin-basic', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
  await users.create(userInfo.admin);
});

afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  // Reset the state of mocked functions before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('user authentication', () => {

    test('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      req.headers = {
        authorization: `Basic ${Buffer.from('admin:incorrectpassword').toString('base64')}`,
      };
    
      await basic(req, res, next);
    
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid username or password' }));
      expect(res.status).toHaveBeenCalledWith(403); 
      expect(res.send).toHaveBeenCalled();
    });

    test('logs in an admin user with the right credentials', async () => {
      let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };
    
      await basic(req, res, next);
    
      expect(next).toHaveBeenCalledWith();
    });
  });
});

// 'use strict';

// // Setting up a secret for JWT tokens
// process.env.SECRET = "TEST_SECRET";

// // Importing necessary dependencies
// const base64 = require('base-64');
// const basic = require('../../../../src/auth/middleware/basic');
// const { userDB, users } = require('../../../../src/auth/models/index');
// // const { test } = require('node:test');

// // Creating a fake user to be used in the test cases
// let userInfo = {
//   admin: { username: 'admin-basic', password: 'password' },
// };

// // Pre-loading the database with a fake user
// beforeAll(async () => {
//   // Syncing the database

//   await userDB.sync();
//   // Creating the user
//   await users.create(userInfo.admin);
// });

// // Teardown the database after the tests are done
// afterAll(async () => {
//   // Dropping the database
//   await userDB.drop();
// });

// describe('Auth Middleware', () => {

//   // Mocking the express req/res/next that we need for each middleware call
//   const req = {};
//   const res = {
//     status: jest.fn(() => res),
//     send: jest.fn(() => res)
//   }
  
//   const next = jest.fn();

//   describe('user authentication', () => {

//     test('fails a login for a user (admin) with the incorrect basic credentials', async () => {
//       const req = {
//         headers: {
//           authorization: `Basic ${Buffer.from('admin:incorrectpassword').toString('base64')}`,
//         },
//       };
//       const res = {
//         status: jest.fn(() => res),
//         send: jest.fn(),
//       };
//       const next = jest.fn();
    
//       await basic(req, res, next);
    
//       expect(next).toHaveBeenCalledTimes(1);
//       expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid username or password' }));
//       expect(res.status).toHaveBeenCalledWith(403); // Expecting a 401 status code
//       expect(res.send).toHaveBeenCalled();
//     });
    
    
//     test('logs in an admin user with the right credentials', async () => {
//       // Encoding the correct username and password
//       let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);
    
//       // Changing the request to match this test case
//       req.headers = {
//         authorization: `Basic ${basicAuthString}`,
//       };
    
//       await basic(req, res, next);
    
//       expect(next).toHaveBeenCalledWith();
//     });
    
    
//   });
// });

'use strict'

const basic = require('./basic');
const base64 = require('base-64');
const { userDB, users } = require('../models/index')

let userInfo = {
  username: 'reedvogt_user',
  password: 'pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ',
  role: 'admin'
}

beforeAll(async () => {
  await userDB.sync();
  await users.create(userInfo)
});

afterAll(async () => {
  await userDB.drop();
});

describe('Testing basic authentication', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  };
  const next = jest.fn();

  test('Fails on login attempt with invalid username', () => {
    const basicAuthString = base64.encode('reedvogt:pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ');

    req.headers = {
      authorization: `Basic ${basicAuthString}`
    };

    return basic(req, res, next)
      .then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403)
      })
  });

  test('Fails on login attempt with invalid username', () => {
    const basicAuthString = base64.encode('reedvogt_user:password');

    req.headers = {
      authorization: `Basic ${basicAuthString}`
    };

    return basic(req, res, next)
      .then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403)
      })
  });

  test('Successfully logs in with valid credentials', () => {
    const basicAuthString = base64.encode('reedvogt_user:pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ');

    req.headers = {
      authorization: `Basic ${basicAuthString}`
    };

    return basic(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalled();
      })
  });

})
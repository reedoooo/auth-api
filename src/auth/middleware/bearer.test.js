'use strict';

process.env.SECRET='secretstring'

const bearer = require('./bearer')
const jwt = require('jsonwebtoken');
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

describe('Testing bearer authentication', () => {

  const req = {
    headers: {
      authorization: null
    }
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
    json: jest.fn(() => res)
  };
  const next = jest.fn();

  test('fails to get all users when token is invalid', () => {

    req.headers.authorization = 'Bearer tokenisinvalid';

    return bearer(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith('Invalid Login');
      })
  });

  test('successfully logs in when a token is valid', () => {
    const user = {username: 'reedvogt_user'}
    const token = jwt.sign(user, process.env.SECRET);

    req.headers.authorization = `Bearer ${token}`;

    return bearer(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      })
  })

})
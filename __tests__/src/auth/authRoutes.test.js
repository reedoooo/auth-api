const request = require('supertest');
const express = require('express');
const authRouter = require('../../authRoutes');

const app = express();
app.use(express.json());
app.use(authRouter);

// Mock user for signup and signin tests
const mockUser = {
  username: 'testuser',
  password: 'testpass'
};

describe('authRouter', () => {
  it('POST /signup should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send(mockUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('POST /signin should authenticate an existing user', async () => {
    const res = await request(app)
      .post('/signin')
      .auth(mockUser.username, mockUser.password);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('GET /users should return a list of usernames', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${mockUser.token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /secret should return a welcome message', async () => {
    const res = await request(app)
      .get('/secret')
      .set('Authorization', `Bearer ${mockUser.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the secret area!');
  });
});


// // import required libraries
// const request = require('supertest');
// const express = require('express');
// const sinon = require('sinon');
// const { users } = require('./models/index.js');
// const authRouter = require('./your-express-router-path');

// const app = express();
// app.use(express.json());
// app.use('/', authRouter);

// // Begin test suite
// describe('Auth Routes', () => {
//   afterEach(() => {
//     if (users.create.restore) users.create.restore();
//     if (users.findAll.restore) users.findAll.restore();
//   });

//   it('POST /signup - success', async () => {
//     const userRecord = { username: 'test', password: 'test', token: 'testtoken' };
//     sinon.stub(users, 'create').resolves(userRecord);
//     const { body } = await request(app).post('/signup').send(userRecord).expect(201);
//     expect(body).toEqual({ user: userRecord, token: userRecord.token });
//   });

//   it('POST /signup - fail with SequelizeUniqueConstraintError', async () => {
//     sinon.stub(users, 'create').throws({ name: 'SequelizeUniqueConstraintError' });
//     const { text } = await request(app).post('/signup').send({}).expect(409);
//     expect(text).toEqual('Username already exists');
//   });

//   it('POST /signin - success', async () => {
//     const user = { username: 'test', password: 'test', token: 'testtoken' };
//     const { body } = await request(app).post('/signin').send(user).expect(200);
//     expect(body).toEqual({ user, token: user.token });
//   });

//   it('POST /signin - fail with User Not Found', async () => {
//     const { text } = await request(app).post('/signin').send({}).expect(404);
//     expect(text).toEqual('User not found');
//   });

//   it('GET /users - success', async () => {
//     sinon.stub(users, 'findAll').resolves([{ username: 'test' }]);
//     const { body } = await request(app).get('/users').expect(200);
//     expect(body).toEqual(['test']);
//   });

//   it('GET /secret - success', async () => {
//     const { text } = await request(app).get('/secret').expect(200);
//     expect(text).toEqual('Welcome to the secret area!');
//   });
// });

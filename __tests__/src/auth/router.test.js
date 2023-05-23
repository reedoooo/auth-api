// 'use strict'

// const server = require('../../../src/server');
// const base64 = require('base-64');
// const { db, users } = require('../../../src/auth/models/index');
// const supertest = require('supertest');
// const app = supertest(server.server)

// let userInfo = {
//   username: 'reedvogt_user',
//   password: 'pfzpgwLIbBGvg1atltIDU34Ea3wwxOQQ',
//   role: 'admin'
// }

// let token;

// beforeAll(async () => {
//     await db.sync();
//     await users.create(userInfo.admin);
//   });

//   afterAll(async () => {
//     await db.drop();
//   });

// describe('Testing authorization & authentication routes', () => {

//   test('Can successfully sign up a new user', async() => {
//     let response = await app.post('/signup').send(userInfo);

//     expect(response.body.user.username).toEqual('reedvogt_user');
//     expect(response.body.user.role).toEqual('admin');
//   })

//   test('Can successfully sign in as an existing user', async() => {
//     let encodedCredentials = base64.encode(`${userInfo.username}:${userInfo.password}`);

//     let response = await app.post('/signin').set(`Authorization`, `Basic ${encodedCredentials}`);

//     token = response.body.user.token;

//     expect(response.body.user.username).toEqual('reedvogt_user');
//     expect(response.body.user.role).toEqual('admin');
//     expect(response.body.user.token).toBeTruthy();
//   })

//   test('Can successfully read from /users', async() => {
//     let response = await app.get('/users').set(`Authorization`, `Bearer ${token}`);

//     expect(response.body[0]).toBe('reedvogt_user');
//   })

//   test('Can access secret area', async() => {
//     let response = await app.get('/secret').set(`Authorization`, `Bearer ${token}`);

//     expect(response.text).toBe('Welcome to the secret area')
//   })
  
// })

// // //     expect(bearerResponse.status).toBe(200);
// // //     expect(bearerResponse.body.username).toEqual(username);
// // //   });
// //
// // //   it('Can get a list of users', async () => {
// // //     let { username, password } = userData.testUser;
// //
// // //     // First, use basic to login to get a token
// // //     const response = await mockRequest.post('/signin')
// // //       .auth(username, password);
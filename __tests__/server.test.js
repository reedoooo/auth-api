const server = require('../src/server');
const { userDB, users } = require('../src/auth/models/index');
const { cardsAndClothesDB } = require('../src/models/index');
const supertest = require('supertest');
const app = supertest(server.server);

beforeAll(async() => {
  await userDB.sync()
  await cardsAndClothesDB.sync()
})

afterAll(async() => {

  await userDB.drop()
  await cardsAndClothesDB.drop()
  // await new Promise((resolve) => setTimeout(() => resolve(), 1000));
})

// afterEach(async () => {
//   await userDB.close();
// });

describe('Testing V2 routes', () => {

  let userInfo = {
    username: 'admin',
    password: 'password',
    role: 'admin'
  };

  let cards = {
    name: 'Dark Magician Girl',
    type: 'spellcaster',
    level: 7,
    monster: true,
  };

  let clothes = {
    type: 'belt',
    color: 'black',
    size: 'large',
    expensive: true,
  };

  let token;

  test('Can POST to cards', async () => {
    let res = await app.post('/signup').send(userInfo);

    token = res.body.user.token;

    let response = await app
      .post('/api/v2/cards')
      .set('Authorization', `Bearer ${token}`)
      .send(cards);

    expect(response.body.name).toBe('Dark Magician Girl');
    expect(response.body.level).toBe(7);
    expect(response.body.type).toBe('spellcaster');
    expect(response.body.monster).toBe(true);

  });

  test('Can POST to clothes', async () => {
    let response = await app.post('/api/v2/clothes').set(`Authorization`, `Bearer ${token}`).send(clothes);

    expect(response.body.type).toBe('belt');
    expect(response.body.color).toBe('black');
    expect(response.body.size).toBe('large');
    expect(response.body.expensive).toBe(true);
  })

  test('Can GET ALL from cards', async () => {
    let response = await app.get('/api/v2/cards').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })

  test('Can GET ALL from clothes', async () => {
    let response = await app.get('/api/v2/clothes').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })

  test('Can GET ONE from cards', async () => {
    let response = await app.get('/api/v2/cards/1').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })

  test('Can GET ONE from clothes', async () => {
    let response = await app.get('/api/v2/clothes/1').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })

  test('Can PUT to cards', async () => {
    let newCard = {
      name: 'Spright Blue',
      type: 'Warrior',
      level: 2,
      monster: true,

    }
    let response = await app.put('/api/v2/cards/1').set(`Authorization`, `Bearer ${token}`).send(newCard);

    expect(response.status).toBe(200);
  })

  test('Can PUT to clothes', async () => {
    let newClothing = {
      type: 'shirt',
      color: 'blue',
      size: 'medium',
        expensive: false,
    }
    let response = await app.put('/api/v2/clothes/1').set(`Authorization`, `Bearer ${token}`).send(newClothing);

    expect(response.status).toBe(200);
  })

  test('Can PATCH to cards', async () => {
    let newCard = {
      name: 'Melffy Puppy',
    }
    let response = await app.patch('/api/v2/cards/1').set(`Authorization`, `Bearer ${token}`).send(newCard);

    expect(response.status).toBe(200);
  })

  test('Can PATCH to clothes', async () => {
    let newClothing = {
      color: 'green',
    }
    let response = await app.patch('/api/v2/clothes/1').set(`Authorization`, `Bearer ${token}`).send(newClothing);

    expect(response.status).toBe(200);
  })

  test('Can DELETE cards', async () => {
    let response = await app.delete('/api/v2/cards/1').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })

  test('Can DELETE clothes', async () => {
    let response = await app.delete('/api/v2/clothes/1').set(`Authorization`, `Bearer ${token}`);

    expect(response.status).toBe(200);
  })
})
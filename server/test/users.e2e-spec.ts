import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /users', () => {
    let server;
    const endpoint = '/users';
    const email = 'email@test.com';
    const password = 'Admin1234';
    let token;

    beforeEach(async () => {
      server = app.getHttpServer();
      //Create new user
      await request(server)
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      //Get JWT
      const { body } = await request(server)
        .post('/auth/signin')
        .send({ email, password })
        .expect(201);

      token = body.accessToken;
    });

    test('get users under authorization', async () => {
      const { body } = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body[0].email).toBe(email);
    });

    test('unauthorized because of wrong JWT', async () => {
      await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}xxxx`)
        .expect(401);
    });

    test('get user by ID', async () => {
      const { body } = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const id = body[0].id;

      const { body: user } = await request(server)
        .get(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(user.id).toBe(id);
      expect(user.email).toBe(email);
    });

    test('NOT get user by ID because of wrong user ID', async () => {
      await request(server)
        .get(`${endpoint}/xxxx`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    test('NOT get user by ID because of wrong JWT', async () => {
      const { body } = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const id = body[0].id;

      await request(server)
        .get(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}xxxx`)
        .expect(401);
    });
  });

  describe('DELETE /users', () => {
    let server;
    const endpoint = '/users';
    const email = 'email@test.com';
    const password = 'Admin1234';
    let token;
    let id;

    beforeEach(async () => {
      server = app.getHttpServer();
      //Create new user
      await request(server)
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      //Get JWT
      const { body } = await request(server)
        .post('/auth/signin')
        .send({ email, password })
        .expect(201);

      token = body.accessToken;

      //Get user id
      const { body: user } = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      id = user[0].id;
    });

    test('delete user by ID', async () => {
      await request(server)
        .delete(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    test('NOT delete user by ID because of wrong user ID', async () => {
      await request(server)
        .get(`${endpoint}/xxxx`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    test('NOT delete user by ID because of wrong JWT', async () => {
      await request(server)
        .get(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}xxxx`)
        .expect(401);
    });
  });

  describe('POST /users', () => {
    let server;
    const endpoint = '/users';
    const email = 'email@test.com';
    const password = 'Admin1234';
    let token;

    beforeEach(async () => {
      server = app.getHttpServer();
      //Create new user
      await request(server)
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      //Get JWT
      const { body } = await request(server)
        .post('/auth/signin')
        .send({ email, password })
        .expect(201);

      token = body.accessToken;
    });

    test('error if try to create new user with same email already exists', async () => {
      await request(server)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ email, password })
        .expect(409);
    });

    test('error if try to create new user with wrong JWT', async () => {
      await request(server)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}xxxxx`)
        .send({ email, password })
        .expect(401);
    });

    test('create new user', async () => {
      const name = 'pablo';
      const surname = 'cianes';

      const { body: user } = await request(server)
        .post(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'new@test.com', password, name, surname })
        .expect(201);

      expect(user.name).toBe(name);
      expect(user.surname).toBe(surname);
    });
  });

  describe('PATCH /users', () => {
    let server;
    const endpoint = '/users';
    const email = 'email@test.com';
    const password = 'Admin1234';
    let token;
    let id;

    beforeEach(async () => {
      server = app.getHttpServer();

      //Create new user
      await request(server)
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      //Get JWT
      const { body } = await request(server)
        .post('/auth/signin')
        .send({ email, password })
        .expect(201);

      token = body.accessToken;

      //Get user id
      const { body: users } = await request(server)
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      id = users[0].id;
    });

    test('error if try to update user with wrong JWT', async () => {
      await request(server)
        .patch(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}xxxxx`)
        .send({ email, password })
        .expect(401);
    });

    test('error if try to update user with same email already exists', async () => {
      const email = 'conflict@email.test';

      //Create new user
      await request(server)
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      await request(server)
        .patch(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email, password })
        .expect(409);
    });

    test('update current user', async () => {
      const name = 'pablo';
      const surname = 'cianes';
      const newEmail = 'pcianes@test.com';

      const { body: user } = await request(server)
        .patch(`${endpoint}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: newEmail, password, name, surname })
        .expect(200);

      expect(user.name).toBe(name);
      expect(user.surname).toBe(surname);
      expect(user.email).toBe(newEmail);
    });
  });
});

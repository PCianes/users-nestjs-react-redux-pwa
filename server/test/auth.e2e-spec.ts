import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/signup', () => {
    const endpoint = '/auth/signup';
    const email = 'email@test.com';
    const password = 'Admin1234';

    test('create new user', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send({ email, password })
        .expect(201);
    });

    test('409 conflict if repeat twice with same email', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send({ email, password })
        .expect(201);

      await request(app.getHttpServer())
        .post(endpoint)
        .send({ email, password })
        .expect(409);
    });
  });

  describe('/auth/signin', () => {
    const endpoint = '/auth/signin';
    const email = 'email@test.com';
    const password = 'Admin1234';

    beforeEach(async () => {
      //Create new user
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);
    });

    test('try without email return error 400', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send({ password })
        .expect(400);
    });

    test('try without password return error 400', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send({ email })
        .expect(400);
    });

    test('successful login return JWT', async () => {
      const { body } = await request(app.getHttpServer())
        .post(endpoint)
        .send({ email, password })
        .expect(201);

      expect(body.accessToken).toBeDefined();
    });
  });

  describe('/auth/me', () => {
    const endpoint = '/auth/me';
    const email = 'email@test.com';
    const password = 'Admin1234';
    let token;

    beforeEach(async () => {
      //Create new user
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email, password })
        .expect(201);

      //Get JWT
      const { body } = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email, password })
        .expect(201);

      token = body.accessToken;
    });

    test('get current user info base on JWT', async () => {
      const { body } = await request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body.id).toBeDefined();
      expect(body.email).toBe(email);
    });

    test('unauthorized because of wrong JWT', async () => {
      await request(app.getHttpServer())
        .get(endpoint)
        .set('Authorization', `Bearer ${token}xxxx`)
        .expect(401);
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from './entities';
import { getValidateCode } from './helpers/ticket';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('pafin assignment (e2e)', () => {
  let app: INestApplication;
  let jwtToken = '';
  const adminEmail = 'cjfff1996@gmail.com';
  const adminPassword = 'admin';

  const createPassword = () => `Ab${getValidateCode(8)}.`;

  const newUser: Partial<User> = (() => {
    return {
      email: `a${getValidateCode(6)}@gmail.com`,
      password: createPassword(),
      name: `P${getValidateCode(6)}`,
    };
  })();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: adminEmail,
        password: adminPassword,
      });

    jwtToken = response.body.data;

    expect(response.status).toEqual(201);
    expect(response.body.data).toBeDefined();
  });

  it('/auth/profile (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.email).toEqual(adminEmail);
  });

  it('/auth/profile (GET) without jwt', async () => {
    const response = await request(app.getHttpServer()).get('/auth/profile');

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Unauthorized');
  });

  it('/user (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(newUser)
      .set('Authorization', `Bearer ${jwtToken}`);

    newUser.id = response.body.data.id;

    expect(response.status).toEqual(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.email).toEqual(newUser.email);
  });

  it('/user (PUT)', async () => {
    const newName = `P${getValidateCode(6)}`;
    const editResponse = await request(app.getHttpServer())
      .put(`/user/${newUser.id}`)
      .send({
        name: newName,
      })
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(editResponse.status).toEqual(200);
    expect(editResponse.body.data).toEqual(true);

    const response = await request(app.getHttpServer())
      .get(`/user/${newUser.id}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toEqual(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.name).toEqual(newName);
    newUser.name = newName;
  });

  it('/user/reset (POST)[retrieve password]', async () => {
    const ticketResponse = await request(app.getHttpServer()).get(
      `/user/ticket?email=${newUser.email}`,
    );

    expect(ticketResponse.status).toEqual(200);
    expect(ticketResponse.body.data.ticket).toBeDefined();

    const { ticket } = ticketResponse.body.data;
    const newPassword = createPassword();
    const resetResponse = await request(app.getHttpServer())
      .post(`/user/reset`)
      .send({
        ticket,
        email: newUser.email,
        password: newPassword,
        confirmPassword: newPassword,
      });

    expect(resetResponse.status).toEqual(201);
    expect(resetResponse.body.data).toEqual(true);

    newUser.password = newPassword;

    const loginResponse = await request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        email: newUser.email,
        password: newUser.password,
      });

    expect(loginResponse.status).toEqual(201);
    expect(loginResponse.body.data).toBeDefined();
  });

  it('/user (DELETE)', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/user/${newUser.id}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body.data).toBeDefined();

    await sleep(1000);

    const getInfoResponse = await request(app.getHttpServer())
      .get(`/user/${newUser.id}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(getInfoResponse.status).toEqual(400);
    expect(getInfoResponse.body.statusCode).toEqual(1005);
    expect(getInfoResponse.body.message).toEqual(['User not found']);
  });
});

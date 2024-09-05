import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PropertyController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/property (GET)', () => {
    return request(app.getHttpServer())
      .get('/property')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('limit');
      });
  });

  it('/property/:id (GET)', () => {
    const id = '9f06f039-88c0-4c06-ba20-161107054764';
    return request(app.getHttpServer())
      .get(`/property/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', id);
        expect(res.body).toHaveProperty('subject');
        expect(res.body).toHaveProperty('body');
      });
  });

  it('/property/:id (GET) - Not Found', () => {
    const id = '231e906c-95be-4a59-96c5-d4ed2ab19c04';
    return request(app.getHttpServer())
      .get(`/property/${id}`)
      .expect(404);
  });
});
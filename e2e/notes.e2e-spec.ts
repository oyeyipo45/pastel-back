import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { toBeOneOf } from 'jest-extended';
import { AppModule } from '../src/app.module';

describe('NotesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(() => {
    expect.extend({ toBeOneOf });
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('It should return a list of notes (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/notes');
    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.OK);
    expect(success).toBe(true);
    expect(message).toBe('Notes retrieved successfully');
  });

  it('It should return an error as note does not exist', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/notes/66d046231f5f95e8e7a40dbc',
    );

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(success).toBe(false);
    expect(message).toBe('Note does not exist');
  });

  //   it('It should return a selected country matching search parameter (GET)', async () => {
  //     const country = 'nigeria';
  //     const response = await request(app.getHttpServer()).get(
  //       `/api/countries/${country}`,
  //     );

  //     expect(response.status).toBe(HttpStatus.OK);
  //   });

  //   it('It should return an error as country does not exist', async () => {
  //     const response = await request(app.getHttpServer()).get(
  //       '/api/countries/naija',
  //     );

  //     const { success, status, message } = response.body;

  //     expect(status).toBe(HttpStatus.NOT_FOUND);
  //     expect(success).toBe(false);
  //     expect(message).toBe('Not Found');
  //   });

  afterAll(async () => {
    await app.close();
  });
});

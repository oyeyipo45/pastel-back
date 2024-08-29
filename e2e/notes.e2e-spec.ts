import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { toBeOneOf } from 'jest-extended';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';

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

  const noteId = '66d0abf7da88a0746e3fd3f0';

  it('It should return a success message after creating a note (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/notes')
      .send({
        _id: new mongoose.Types.ObjectId(noteId),
        title: 'test title',
        content: 'test Content',
      });

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.CREATED);
    expect(success).toBe(true);
    expect(message).toBe('Note created successfully');
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

    const { statusCode, message } = response.body;

    expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(message).toBe('Note does not exist');
  });

  it('It should retrieve a note with the provided ID (GET)', async () => {
    // This ticket has been created in the database already
    const response = await request(app.getHttpServer()).get(
      `/api/notes/${noteId}`,
    );

    const { title, content } = response.body.data;

    expect(response.status).toBe(HttpStatus.OK);
    expect(title).toBe('test title');
    expect(content).toBe('test Content');
  });

  it('It should return an updated note (UPDATE)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/api/notes/${noteId}`)
      .send({
        _id: new mongoose.Types.ObjectId(noteId),
        title: 'updated title',
        content: 'updated Content',
      });

    const { success, status, message } = response.body;

    expect(status).toBe(HttpStatus.OK);
    expect(success).toBe(true);
    expect(message).toBe('Note updated successfully');
  });

  it('It should hard delete the note with the provided ID (DELETE)', async () => {
    // This ticket has been created in the database already
    const response = await request(app.getHttpServer()).delete(
      `/api/notes/${noteId}/hard`,
    );
    const { success } = response.body;
    const { status } = response;

    const { message } = response.body;
    expect(status).toBe(HttpStatus.OK);
    expect(success).toBe(true);
    expect(message).toBe('Note deleted successfully');
  });

  afterAll(async () => {
    await app.close();
  });
});

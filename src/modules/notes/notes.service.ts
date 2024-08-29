import { Model } from 'mongoose';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/note.dto';
import { Note } from './Interfaces/note.interface';
import { APIResponse } from '../../common/types/api-response.type';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_MODEL')
    private noteModel: Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<APIResponse> {
    // Create a new note object
    const data = { ...createNoteDto, createdAt: new Date(), isDeleted: false };

    // Create note and save in DB
    const createdNote = this.noteModel.create(data);

    if (createdNote) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: `Note created successfully`,
      };
    }

    throw new HttpException(
      'Unable to create note',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

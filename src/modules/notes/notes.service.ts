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

  async createNote(createNoteDto: CreateNoteDto): Promise<APIResponse> {
    // Create a new note object
    const data = { ...createNoteDto, createdAt: new Date(), isDeleted: false };

    // Create note and save in DB
    const createdNote = await this.noteModel.create(data);

    if (createdNote) {
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: `Note created successfully`,
      };
    }

    throw new HttpException(
      'Unable to create note',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async fetchNotes(): Promise<APIResponse<Note[]>> {
    // Fetch all notes available in the DB
    const notes = await this.noteModel.find();

    if (notes) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: `Notes fetched successfully`,
        data : notes
      };
    }

    throw new HttpException(
      'Unable to fetch notes',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

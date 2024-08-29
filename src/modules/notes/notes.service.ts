import { Model } from 'mongoose';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './Interfaces/note.interface';
import { APIResponse } from '../../common/types/api-response.type';
import { UpdateNoteDto } from './dtos/update-note.dto';

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
        data: notes,
      };
    }

    throw new HttpException(
      'Unable to fetch notes',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async fetchNoteById(id: string): Promise<APIResponse<Note>> {
    // Fetch note available in the DB using provided
    const note = await this.noteModel.findById(id);

    if (note) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: `Note fetched successfully`,
        data: note,
      };
    }

    throw new HttpException(
      'Unable to fetch note',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async updateNote(body: UpdateNoteDto): Promise<APIResponse> {
    // Fetch note available in the DB using provided id and update with new data
    const { _id: id, title, content } = body;

    const note = await this.noteModel.findByIdAndUpdate(id, { title, content });

    if (note) {
      return {
        success: true,
        status: HttpStatus.OK,
        message: `Note updated successfully`,
      };
    }

    throw new HttpException(
      'Unable to fetch note',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

import { Model } from 'mongoose';
import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Note } from './Interfaces/note.interface';
import { APIResponse } from '../../common/types/api-response.type';
import { ErrorComposer } from '../../utils/compose.error';
@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_MODEL')
    private noteModel: Model<Note>,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<APIResponse> {
    try {
      // Create a new note object
      const data = {
        ...createNoteDto,
        createdAt: new Date(),
        isDeleted: false,
      };

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
    } catch (error) {
      const { message, status } = ErrorComposer.compose(error);
      throw new HttpException(message, status);
    }
  }

  async fetchNotes(): Promise<APIResponse<Note[]>> {
    try {
      // Fetch all notes available in the DB
      const notes = await this.noteModel.find({ isDeleted: false });

      if (notes) {
        return {
          success: true,
          status: HttpStatus.OK,
          message: `Notes retrieved successfully`,
          data: notes,
        };
      }

      throw new HttpException(
        'Unable to retrieve notes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      const { message, status } = ErrorComposer.compose(error);
      throw new HttpException(message, status);
    }
  }

  async fetchNoteById(id: string): Promise<APIResponse<Note>> {
    try {
      // Fetch note available in the DB using provided
      const note = await this._findNote(id);

      if (note) {
        return {
          success: true,
          status: HttpStatus.OK,
          message: `Note retrieved successfully`,
          data: note,
        };
      }

      throw new HttpException(
        'Unable to retrieve note',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      
      
      const { message, status } = ErrorComposer.compose(error);
      throw new HttpException(message, status);
    }
  }

  async updateNote(id: string, body: CreateNoteDto): Promise<APIResponse> {
    try {
      // Fetch note available in the DB using provided id and update with new data
      const { title, content } = body;

      // Validate note exists
      await this._findNote(id);

      // Update and save note
      const updatedNote = await this.noteModel.findByIdAndUpdate(id, {
        title,
        content,
      });

      // Return note
      if (updatedNote) {
        return {
          success: true,
          status: HttpStatus.OK,
          message: `Note updated successfully`,
        };
      }

      throw new HttpException(
        'Unable to retrieve note',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      const { message, status } = ErrorComposer.compose(error);
      throw new HttpException(message, status);
    }
  }

  async deleteNote(id: string): Promise<APIResponse> {
    try {
      // Fetch note available in the DB using provided id and update with new data

      // Validate note exists
      await this._findNote(id);

      // soft delete note note
      const deletedNote = await this.noteModel.findByIdAndUpdate(id, {
        isDeleted: true,
      });

      // Return note
      if (deletedNote) {
        return {
          success: true,
          status: HttpStatus.OK,
          message: `Note deleted successfully`,
        };
      }

      throw new HttpException(
        'Unable to retrieve note',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      const { message, status } = ErrorComposer.compose(error);
      throw new HttpException(message, status);
    }
  }

  private async _findNote(id: String) {
    const note = await this.noteModel
      .findOne({ _id: id, isDeleted: false })
      .exec();

    if (!note) {
      throw new HttpException('Note does not existeeeeeeee', HttpStatus.NOT_FOUND);
    }

    return note;
  }
}

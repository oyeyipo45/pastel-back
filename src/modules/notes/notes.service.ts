import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateNoteDto } from './dtos/note.dto';
import { Note } from './Interfaces/note.interface';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTE_MODEL')
    private noteModel: Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }
}

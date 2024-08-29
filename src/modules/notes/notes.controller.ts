import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { CreateNoteDto } from './dtos/note.dto';
import { NotesService } from './notes.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '../../common/types/api-response.type';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Note } from './Interfaces/note.interface';

@ApiTags('Notes')
@Controller({ path: 'api/notes', version: '1' })
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @ApiOperation({
    summary: 'Create new note',
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<APIResponse> {
    return this.noteService.createNote(createNoteDto);
  }

  @ApiOperation({
    summary: 'Fetch all notes',
  })
  @Get()
  async fetchNotes(): Promise<APIResponse<Note[]>> {
    return this.noteService.fetchNotes();
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateNoteDto } from './dtos/note.dto';
import { NotesService } from './notes.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @ApiOperation({
    summary: 'Create new note',
  })
  @Post('/notes')
  async create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }
}

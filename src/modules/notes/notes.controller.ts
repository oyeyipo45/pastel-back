import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateNoteDto } from './dtos/note.dto';
import { NotesService } from './notes.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '../../common/types/api-response.type';

@ApiTags('Notes')
@Controller({ path: 'notes', version: '1' })
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @ApiOperation({
    summary: 'Create new note',
  })
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) : Promise<APIResponse> {
    return this.noteService.create(createNoteDto);
  }
}

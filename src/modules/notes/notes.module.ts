import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../datasource/database.module';
import { NotesProviders } from './notes.providers';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService, ...NotesProviders],
})
export class NotesModule {}

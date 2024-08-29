import { Connection } from 'mongoose';
import { NotesSchema } from '../../models/note.model';

export const NotesProviders = [
  {
    provide: 'NOTE_MODEL',
    useFactory: (connection: Connection) => connection.model('Note', NotesSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

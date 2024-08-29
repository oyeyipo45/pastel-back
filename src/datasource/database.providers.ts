import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

// Envirionment variabled
const USERNAME = configService.get('USERNAME');
const PASSWORD = configService.get('PASSWORD');
const DB_NAME = configService.get('DB_NAME');

// connection string to mongo atlas
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@damilola.s7fen.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(uri),
  },
];

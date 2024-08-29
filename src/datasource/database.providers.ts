import * as mongoose from 'mongoose';

// Envirionment variabled
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;

// connection string to mongo atlas
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@lenda.padmy06.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(uri),
  },
];

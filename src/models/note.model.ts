import * as mongoose from 'mongoose';

export const NotesSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  isSDeleted: Boolean,
});

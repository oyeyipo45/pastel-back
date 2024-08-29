import { Document } from 'mongoose';

export interface Note extends Document {
  readonly title: string;
  readonly content: number;
  readonly createdAt: Date;
  readonly isDeleted: Boolean;
}
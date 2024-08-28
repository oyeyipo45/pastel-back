import { INotes } from "@Interfaces/note.interface";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto implements INotes {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  createdAt!: Date;

  @IsBoolean()
  @IsNotEmpty()
  isDeleted!: boolean;
}

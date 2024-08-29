import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false, default: false })
  isDeleted?: Boolean;
}

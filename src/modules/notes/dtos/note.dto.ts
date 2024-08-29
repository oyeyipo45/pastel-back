export class CreateNoteDto {
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly isDeleted: Boolean;
}

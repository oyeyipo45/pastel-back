import { HttpStatus } from '@nestjs/common';
export interface APIResponse<T = undefined> {
  success: boolean;
  status: HttpStatus;
  message: string;
  data?: T;
  error?: T extends undefined ? unknown : never;
}

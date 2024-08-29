import { HttpStatus } from '@nestjs/common';
import { CONSTANTS } from '../common/constants';

export class ErrorComposer extends Error {
  /**
   * Composes an error message from a given error object.
   * @param error - The error object to compose the message from.
   * @returns The composed error message.
   */

  public static compose(error: any): {
    message: string;
    status: number;

    success: Boolean;
  } {
    //mongoose bad ObjectId
    if (error.name === 'CastError') {
      return {
        message: `Note with id:${error.value} not found`,
        status: HttpStatus.NOT_FOUND,
        success: false,
      };
    }

    //mongoose duplicate key
    if (error.code === 11000) {
      return {
        message: `Duplicate field value entered`,
        status: HttpStatus.BAD_REQUEST,
        success: false,
      };
    }

    return {
      message: error.message || CONSTANTS.INTERNAL_SERVER_ERROR_MESSAGE,
      status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
    };
  }
}

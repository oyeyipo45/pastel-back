import { HttpStatus } from '@nestjs/common';

export class ErrorComposer extends Error {
  /**
   * Composes an error message from a given error object.
   * @param error - The error object to compose the message from.
   * @returns The composed error message.
   */

  public static compose(error: any): { message: string; statusCode: number } {
    //mongoose bad ObjectId
    if (error.name === 'CastError') {
      return {
        message: `Note not found with id of ${error.value}`,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    //mongoose duplicate key
    if (error.code === 11000) {
      return {
        message: `Duplicate field value entered`,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    return {
      message: error.message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}

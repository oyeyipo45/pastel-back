import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: no body submitted',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors && errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${this.formatErrorMessage(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private isEmpty(value: any): boolean {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype == type);
  }

  private formatErrorMessage(errors: any[]): string {
    const errorMessages = errors.map((error) => {
      return Object.values(error.constraints).join(', ');
    });
    if (errorMessages.length > 1) {
      return errorMessages.join(', ');
    }
    return errorMessages[0];
  }
}

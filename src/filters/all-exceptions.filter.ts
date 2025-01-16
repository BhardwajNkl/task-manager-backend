
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { DatabaseError, ValidationError } from 'sequelize';

/**
 * An exception filter which catches all exceptions.
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    // A base response for the client. We will modify this as needed for different types of exceptions.
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error!";
    let response:any={
      httpStatus,
      message
    };

    if (exception instanceof HttpException) { // Handling HTTP exceptions.
      httpStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse(); // In case of DTO validation exceptions, the exception contains a useful response object.

      if(exceptionResponse && exceptionResponse['message']){
        response = {
          httpStatus,
          message: exceptionResponse['message'], // Use validation failure response as message.
        }
      } else{
        response = {
          httpStatus,
          message: exception.message
        }
      }
      
    } else if (exception instanceof DatabaseError) { // Handling database related errors.
      response = {
        httpStatus,
        message: "Database error!"
      }
    } else if (exception instanceof ValidationError) { // Handling entity/model validation errors.
      httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
      const errorMessage = exception.errors[0].message; // Get the first validation error message.
      response = {
        httpStatus,
        message:errorMessage
      }
    }

    httpAdapter.reply(ctx.getResponse(), response, httpStatus);
  }
}

import HttpException from "../../common/http-exception";
import {Request, Response, NextFunction} from "express";
import {logger} from '../../shared/loggers/error-logger';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const status = error.statusCode || error.status || 500;
  logger.log({level: 'error', message: `Internal Server Error ${error?.message || ''} with Status: ${status}`});
  response.status(status).json({
    success: false,
    status: status,
    message: error.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  })
};
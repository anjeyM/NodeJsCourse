import HttpException from "../../common/http-exception";
import { Request, Response } from "express";
import {logger} from '../../shared/loggers/error-logger';

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response
) => {
  const status = error.statusCode || error.status || 500;
  logger.log({level: 'error', message: `Internal Server Error ${error?.message || ''} with Status: ${status}`});
  return response.status(status).send(error);
};
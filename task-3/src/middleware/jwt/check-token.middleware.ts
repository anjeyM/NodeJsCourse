import {Request, Response, NextFunction} from "express";
import {logger} from '../../shared/loggers/error-logger';
import {verify, Secret} from 'jsonwebtoken';

export const checkToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token: string = request.body.token || request.query.token || request.headers['x-access-token'];
  if (token) {
    verify(token, process.env.TOKEN_KEY as Secret, (error: any) => {
      if (error) {
          response.status(403).send('Failed to authenticate Token.');
      } else {
          next();
      }
    })
  } else {
    logger.error('Error call checkToken() (Token not found) with args: %O', request.body);
    response.status(403).send('JWT Token not found')
  }
};
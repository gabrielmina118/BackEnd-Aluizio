import { NextFunction, Request, Response } from 'express';
import BaseError from '../../../shared/errors/BaseError';
import Authenticator from '../Authenticator/Authenticator';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new BaseError('JWT TOKEN is missing', 404);
  }

  try {
    new Authenticator().getData(authHeader);
    return next();
  } catch (error) {
    throw new BaseError('Invalid JWT Token');
  }
}

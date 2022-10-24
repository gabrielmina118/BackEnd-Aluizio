import { NextFunction, Request, Response } from 'express';
import Authenticator from '../../../../modules/users/infra/http/Authenticator/Authenticator';
import BaseError from '../../../errors/BaseError';

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
    const decoded = new Authenticator().getData(authHeader);

    request.user={
      id:decoded.id
    }

    return next();
  } catch (error) {
    throw new BaseError('Invalid JWT Token');
  }
}

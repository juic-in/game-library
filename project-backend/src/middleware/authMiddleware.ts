import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';

export const requireUserAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Invalid token'));
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        return next(new UnauthorizedError('Invalid token'));
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export const requireAdminAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('No token provided'));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded === 'string') {
        return next(new UnauthorizedError('Invalid token'));
      }

      req.user = decoded as JwtPayload;

      if (!req.user.isAdmin) {
        return next(new ForbiddenError('Admin access required'));
      }

      next();
    }
  );
};

export const injectUserIntoView = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
};

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload & {
    id?: string; // or _id if you're using MongoDB
    isAdmin?: boolean;
    email?: string;
  };
}

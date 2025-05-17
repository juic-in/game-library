import bcrypt from 'bcrypt';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/authUtil';
import { addUser, findUserByEmail } from '../../data/db/dbUser';
import { UnauthorizedError } from '../../utils/errors';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import jwt from 'jsonwebtoken';

export interface JwtPayloadUser {
  userId: string;
  username: string;
  profilePicture: string;
  isAdmin: boolean;
}

export const authRegister = async (
  username: string,
  email: string,
  password: string
): Promise<JwtPayloadUser> => {
  await validateEmail(email);
  await validateName(username);
  await validatePassword(password);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await addUser({ username, email, password: hashedPassword });

  return {
    userId: user._id.toString(),
    username: user.username,
    profilePicture: user.profilePicture,
    isAdmin: user.isAdmin,
  };
};

export const authLogin = async (
  email: string,
  password: string
): Promise<JwtPayloadUser> => {
  const user = await findUserByEmail(email);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return {
        userId: user._id.toString(),
        username: user.username,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin,
      };
    }
  }
  // Ambigious for privacy reasons
  throw new UnauthorizedError('Incorrect email and/or password');
};

export const authVerify = async (req: AuthenticatedRequest) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Invalid token');
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayloadUser;
    return decoded;
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};

export const authLogout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
};

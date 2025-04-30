import bcrypt from 'bcrypt';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/authUtil';
import { addUser, findUserByEmail } from '../../data/db/dbUser';
import { UnauthorizedError } from '../../utils/errors';
import { Request, Response } from 'express';

export const authRegister = async (
  username: string,
  email: string,
  password: string
) => {
  await validateEmail(email);
  await validateName(username);
  await validatePassword(password);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await addUser({ username, email, password: hashedPassword });

  return user;
};

export const authLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  // Ambigious for privacy reasons
  throw new UnauthorizedError('Incorrect email and/or password');
};

export const authLogout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  // Easier to throw an 401 error and have the frontend send user to login page
  // rather than handling specifically this logout case
  throw new UnauthorizedError('User has been logged out');
};

import { findUserByEmail, findUserByUsername } from '../data/db/dbUser';
import { BadRequestError } from './errors';
import * as EmailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

export const validateName = async (name: string) => {
  const len = name.length;
  if (/[^a-zA-Z0-9_/-]/.test(name))
    throw new BadRequestError(
      'Invalid characters detected, name must be of alphanumerical characters, hypens or underscores'
    );
  else if (len < 1)
    throw new BadRequestError(
      'Username has to be greater than or equal to one character'
    );
  else if (len > 20)
    throw new BadRequestError(
      'Username has to be less than or equal to 20 character'
    );
  else if (await findUserByUsername(name))
    throw new BadRequestError(`Sorry, ${name} is currently taken`);
};

export const validatePassword = async (password: string) => {
  const len = password.length;
  if (len < 8)
    throw new BadRequestError('Password must be greater than 8 characters');
  else if (len > 128)
    throw new BadRequestError(
      'Password is too long, please limit it to under 128 characters'
    );
  if (!/[a-z]/.test(password))
    throw new BadRequestError('Password must contain a lowercase letter');
  else if (!/[A-Z]/.test(password))
    throw new BadRequestError('Password must contain an uppercase letter');
  else if (!/[0-9]/.test(password))
    throw new BadRequestError('Password must contain a number');
  else if (!/[!@#$%^&*]/.test(password))
    throw new BadRequestError('Password must contain a special character');
};

export const validateEmail = async (email: string) => {
  if (!email) throw new BadRequestError('Please enter an email');
  if (!EmailValidator.validate(email)) {
    throw new BadRequestError(`Not a valid email`);
  }
  if (await findUserByEmail(email)) {
    throw new BadRequestError(`Not a valid email - already in use`);
  }
};

export const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET not defined in environment variables');
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: maxAge });
};

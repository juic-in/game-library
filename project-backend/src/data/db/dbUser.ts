/**
 * This file interacts directly with the database for any user-related data
 */

import { NotFoundError } from '../../utils/errors';
import { Types } from 'mongoose';
import { User } from '../models/User';

// Create (register new user)
export const addUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const user = { ...userData, oldPasswords: [userData.password] };
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

// Read (find user by ID)
export const findUserById = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId))
    throw new NotFoundError('Invalid User Id');

  const user = await User.findById(userId);
  return user;
};

// Read (find user by username)
export const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username });
  return user;
};

// Read (find user by email)
export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

// Update user by ID
export const updateUserById = async (userId: string, updateData: any) => {
  if (!Types.ObjectId.isValid(userId))
    throw new NotFoundError('Invalid User Id');

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  return updatedUser;
};

// Delete user by ID
export const deleteUserById = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId))
    throw new NotFoundError('Invalid User Id');

  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

// Get all users
export const getAllUsers = async () => {
  return await User.find({});
};

export const clearUsers = async () => {
  await User.deleteMany({});
};

import bcrypt from 'bcrypt';
import { BadRequestError } from './errors';

const users: Record<string, { passwordHash: string }> = {};

// Function to register a new user
export async function registerUser(
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  if (users[username]) {
    throw new BadRequestError('Username already exists');
  }

  // Validate password length
  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = { passwordHash };
  return { success: true, message: 'User registered successfully' };
}

// Function to log in a user
export async function loginUser(
  username: string,
  password: string,
  session: string
): Promise<{ success: boolean; message: string }> {
  const user = users[username];
  if (!user) {
    return { success: false, message: 'Invalid username or password' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return { success: false, message: 'Invalid username or password' };
  }

  session.user = { username };
  return { success: true, message: 'Login successful' };
}

// Function to log out a user
export function logoutUser(
  session: any
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    session.destroy((err: any) => {
      if (err) {
        reject({ success: false, message: 'Failed to log out' });
      } else {
        resolve({ success: true, message: 'Logout successful' });
      }
    });
  });
}

// Function to check if a user is authenticated
export function isAuthenticated(session: any): {
  success: boolean;
  message: string;
  username?: string;
} {
  if (!session.user) {
    return { success: false, message: 'Unauthorized' };
  }

  return {
    success: true,
    message: `Welcome, ${session.user.username}`,
    username: session.user.username,
  };
}

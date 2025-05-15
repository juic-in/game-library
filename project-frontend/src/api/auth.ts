import axios from './axios';
import { handleResponse } from './util';

export const register = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/api/user/auth/register', {
      credentials,
    });
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/api/user/auth/login', { credentials });
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const verify = async () => {
  try {
    const response = await axios.get('/api/user/auth/verify');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

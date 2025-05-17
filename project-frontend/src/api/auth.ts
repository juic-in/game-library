import axios from './axios';
import { handleResponse } from './util';

export const authRegister = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('user/auth/register', credentials);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const authLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('user/auth/login', credentials);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const authVerify = async () => {
  try {
    const response = await axios.get('user/auth/verify');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const authLogout = async () => {
  try {
    const response = await axios.post('user/auth/logout');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

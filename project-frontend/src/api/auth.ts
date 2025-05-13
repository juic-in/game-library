import axios from './axios';

export const register = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/api/user/auth/register', {
      credentials,
    });
    return response.data;
  } catch (error) {
    return { error };
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post('/api/user/auth/login', { credentials });
    return response.data;
  } catch (error) {
    return { error };
  }
};

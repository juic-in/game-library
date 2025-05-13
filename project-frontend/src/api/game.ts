import axios from './axios';
import { handleResponse } from './util';

export const getGamesList = async () => {
  try {
    const response = await axios.get('public/game/lib');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

import { InitialGame } from '../interface';
import axios from './axios';
import { handleResponse } from './util';

export const addToGamesLib = async (gameData: InitialGame) => {
  try {
    const response = await axios.post('admin/game', gameData);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string}
  }
}

export const getGamesList = async () => {
  try {
    const response = await axios.get('public/game/lib');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

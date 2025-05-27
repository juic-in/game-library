import { InitialGame } from '../interface';
import axios from './axios';
import { handleResponse } from './util';

export const addToGamesLib = async (gameData: InitialGame) => {
  try {
    const response = await axios.post('admin/game', gameData);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const removeFromGamesLib = async (gameId: string) => {
  try {
    const response = await axios.delete(`admin/game/${gameId}`);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const getGamesList = async (searchQuery: string, page: number) => {
  try {
    const response = await axios.get(`public/game/lib?search=${searchQuery}&page=${page}`);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const getGameData = async (gameId: string) => {
  try {
    const response = await axios.get(`public/game/${gameId}`);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
}

export const getGameIdentifiers = async () => {
  try {
    const response = await axios.get('public/game/identifiers');
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

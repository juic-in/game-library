import axiosInstance from "./axios";
import { handleResponse } from "./util";

export const checkIfWished = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`user/check/wishlist/${gameId}`);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};

export const checkIfOwned = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`user/check/games/${gameId}`);
    return handleResponse(response);
  } catch (error) {
    return { error: (error as any).message as string };
  }
};
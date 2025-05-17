import { AxiosResponse } from 'axios';

export const handleResponse = (response: AxiosResponse) => {
  const { status, data } = response;
  return {
    status,
    payload: data,
  };
};

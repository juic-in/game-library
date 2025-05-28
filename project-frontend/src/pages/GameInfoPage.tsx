import { useEffect, useState } from 'react';
import { useModal } from '../context/ModalProvider';
import { getGameData } from '../api/game';
import { Game } from '../interface';
import { useLocation } from 'react-router-dom';

export const GameInfoPage = () => {
  const [game, setGame] = useState<Game | null>(null);

  const params = new URLSearchParams(useLocation().search);
  const gameId = params.get('ref') as string;

  const { openErrorModal } = useModal();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGameData(gameId);
        if ('error' in response) {
          openErrorModal(response.error);
          return;
        }

        const { success, data: gameData } = response.payload;

        // Only need to check success, as this route doesnt have complex errors
        if (!success) {
          openErrorModal('Failed to load game data. Please try again.');
          return;
        } else if (!gameData) {
          openErrorModal('Game data not found.');
          return;
        }

        setGame(gameData);
      } catch (error) {
        openErrorModal('Failed to load game data. Please try again.');
      }
    };
    fetchData()
    window.scrollTo(0, 0);
  }, [game]);

  return <div>{JSON.stringify(game, null, 2)}</div>;
};

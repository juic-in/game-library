import { SimpleGrid, Box } from '@chakra-ui/react';
import { GameCard } from '../components/GameCard'; // Assuming the path is correct
import { useEffect, useState } from 'react';
import { getGamesList } from '../api/game';
import { ErrorModal } from '../components/ErrorModal';

interface GameCardInfo {
  _id: string;
  name: string;
  description: string;
}

export const HomePage = () => {
  const [games, setGames] = useState<GameCardInfo[]>([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGamesList();

      if ('error' in response) {
        setError(response.error);
        setIsModalOpen(true);
        return;
      }
      const { status, data } = response;
      switch (status) {
        case 200:
          const keysToKeep = ['_id', 'name', 'description'];

          const filteredData: GameCardInfo[] = data.data.map(
            (obj: Record<string, any>): GameCardInfo => {
              const filtered: Partial<GameCardInfo> = {};
              keysToKeep.forEach((key: string) => {
                if (key in obj) {
                  filtered[key as keyof GameCardInfo] =
                    obj[key as keyof GameCardInfo];
                }
              });
              return filtered as GameCardInfo;
            }
          );
          setGames(filteredData);
          break;
        // handle other errors later
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    document.body.style.marginTop = '64px';

    return () => {
      document.body.style.marginTop = '0';
    };
  }, []);

  return (
    <>
      <Box p={2}>
        <SimpleGrid
          columns={[1, 2, 3, 4, 5]} // Added `6` columns for large screens (2xl)
          spacing={[3, 4, 5]} // Adjust spacing for different screen sizes
          mx="auto" // Center the grid on larger screens
        >
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.name}
              description={game.description}
            />
          ))}
        </SimpleGrid>
      </Box>

      {error && (
        <ErrorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          errorMessage={error}
        />
      )}
    </>
  );
};

import { SimpleGrid, Flex, Box, Input, HStack } from '@chakra-ui/react';
import { GameCard } from '../components/GameCard'; // Assuming the path is correct
import { useEffect, useState } from 'react';
import { getGamesList } from '../api/game';
import { useModal } from '../context/ModalProvider';

interface GameCardInfo {
  _id: string;
  name: string;
  description: string;
}

  // TODO: Set up pagination, add limits to  backend, also introduce limits to backend
  

const LIMIT = 50

export const DiscoverPage = () => {
  const [games, setGames] = useState<GameCardInfo[]>([]);

  const [searchQuery, setSearcyQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { openErrorModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGamesList();

      if ('error' in response) {
        openErrorModal(response.error);
        return;
      }
      const { status } = response;
      const { data } = response.payload;
      switch (status) {
        case 200:
          const keysToKeep = ['_id', 'name', 'description'];
          const filteredData: GameCardInfo[] = data.map(
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

  // TODO: FIX THE GRID LAYOUT, SHOULD BE DYNAMIC WITH A MIN SIZE
  return (
    <>
      <Flex
        className="main-library-container"
        justifyContent="center"
        alignItems="center"
        flexDirection='column'
        p={10}
        gap={5}
      >
        <HStack>
          <Input name="search-item"/>
        </HStack>
        <SimpleGrid
          className="games-container"
          columns={[1, 1, 2, 3, 4, 5]} // Added `6` columns for large screens (2xl)
          spacing={[3, 4, 5]} // Adjust spacing for different screen sizes
        >
          {games
            .concat(games)
            .concat(games)
            .concat(games)
            .concat(games)
            .concat(games)
            .map(
              (
                game,
                index // testing
              ) => (
                // {games.map((game, index) => (
                <GameCard
                  key={index}
                  title={game.name}
                  description={game.description}
                  owned={false} // Placeholder, replace with actual ownership logic
                  loggedIn={false} // Placeholder, replace with actual login status
                />
              )
            )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

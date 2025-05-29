import {
  SimpleGrid,
  Flex,
  Box,
  Input,
  HStack,
  Grid,
  GridItem,
  Button,
} from '@chakra-ui/react';
import { GameCard } from '../components/GameCard'; // Assuming the path is correct
import { useEffect, useMemo, useState } from 'react';
import { getGamesList } from '../api/game';
import { useModal } from '../context/ModalProvider';

interface GameCardInfo {
  _id: string;
  name: string;
  description: string;
  images: {
    cardImage: string,
    
  }
}

// TODO: Set up pagination, add limits to  backend, also introduce limits to backend

const LIMIT = 50;

export const DiscoverPage = () => {
  const [games, setGames] = useState<GameCardInfo[]>([]);

  const [searchQuery, setSearcyQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { openErrorModal } = useModal();

  const fetchGames = async (searchQuery: string, page: number) => {
    const response = await getGamesList(searchQuery, page);

    if ('error' in response) {
      openErrorModal(response.error);
      return;
    }
    const { status } = response;
    const { data } = response.payload;

    switch (status) {
      case 200:
        const keysToKeep = ['_id', 'name', 'description', 'images'];
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
        setGames(
          filteredData
            .concat(filteredData)
            .concat(filteredData)
            .concat(filteredData)
            .concat(filteredData)
            .concat(filteredData)
        );
        console.log(filteredData)
        break;
      // handle other errors later
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGames(searchQuery, pageNumber);
  }, [pageNumber]);

  const handleSearch = () => {
    fetchGames(searchQuery, pageNumber);
  };

  return (
    <>
      <Flex
        className="main-library-container"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        p={10}
        gap={5}
      >
        <HStack className="search-container" w="100%">
          <Input
            className="search-box-input"
            name="search-item"
            borderRadius={1}
            onChange={(e) => setSearcyQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <Button onClick={handleSearch}>Search</Button>
        </HStack>
        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          className="games-container"
          gap={3}
          w="100%"
        >
          {games.map(
            (
              game,
              index // testing
            ) => (
              // {games.map((game, index) => (
              <GameCard
                key={index}
                name={game.name}
                gameId={game._id}
                image={game.images.cardImage}
                owned={false} // Placeholder, replace with actual ownership logic
                loggedIn={false} // Placeholder, replace with actual login status
              />
            )
          )}
        </Grid>
      </Flex>
    </>
  );
};

import { useEffect, useState } from 'react';
import { useModal } from '../context/ModalProvider';
import { getGameData } from '../api/game';
import { Game } from '../interface';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ContentStates } from '../enums';
import { GameInfo } from '../components/Content-States/GameInfo';
import { GameStore } from '../components/Content-States/GameStore';

export const GameInfoPage = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [contentState, setContentState] = useState<ContentStates>(
    ContentStates.Info
  );

  const params = new URLSearchParams(useLocation().search);
  const gameId = params.get('ref') as string;

  const bgColour = useColorModeValue('gray.100', 'gray.700');
  const buttonColor = useColorModeValue('gray.200', 'gray.800');

  const navigate = useNavigate();

  const { openErrorModal } = useModal();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGameData(gameId);
        if ('error' in response) {
          openErrorModal(response.error);
          navigate('/discover');

          return;
        }

        const { success, data: gameData } = response.payload;

        // Only need to check success, as this route doesnt have complex errors
        if (!success) {
          openErrorModal('Failed to load game data. Please try again.');
          navigate('/discover');

          return;
        } else if (!gameData) {
          openErrorModal('Game data not found.');
          navigate('/discover');

          return;
        }

        setGame(gameData);
      } catch (error) {
        openErrorModal('Failed to load game data. Please try again.');
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [gameId]);

  const renderContent = () => {
    switch (contentState) {
      case ContentStates.Info:
        return game ? <GameInfo game={game} /> : null;
      case ContentStates.Store:
        return game ? <GameStore game={game} /> : null;
    }
  };

  return (
    <Flex
      flexDir="column"
      p={4}
      alignItems="center"
      mx="auto"
      h="100%"
      maxW="1200px"
      justifyContent="flex-start"
      boxShadow="2xl"
      borderRadius={2}
      bg={bgColour}
      gap={2}
    >
      <Heading>
        {game ? game.name : 'Game not found / game does not have a name'}
      </Heading>
      {game?.images.contentImage ? (
        <Image
          mx="auto"
          src={game.images.contentImage}
          objectFit="contain"
          h="700px"
        />
      ) : (
        <Text
          textAlign="center"
          h="700px"
          fontSize="xl"
          py={10}
          borderWidth={1}
          w="100%"
        >
          No image provided.
        </Text>
      )}
      <Flex
        my={6}
        flexDir="row"
        justifyContent="space-evenly"
        alignItems="center"
        w="80%"
        gap={2}
      >
        {Object.values(ContentStates).map((state) => (
          <Button
            borderRadius={0}
            bg={buttonColor}
            flex="1"
            onClick={() => setContentState(state)}
          >
            {state}
          </Button>
        ))}
      </Flex>
      {renderContent()}
    </Flex>
  );
};

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalProvider';
import { getGameIdentifiers, removeFromGamesLib } from '../../api/game';
import { GameSelector } from '../Selectors/GameSelector';
import { GameRef } from '../../interface';

export const DeleteGameForm = () => {
  const [games, setGames] = useState<GameRef[]>([]);
  const [selectedGames, setSelectedGames] = useState<GameRef[]>([]);

  const { openErrorModal } = useModal();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGameIdentifiers();
        if ('error' in response) {
          openErrorModal(response.error);
          return;
        }
        const { status } = response;
        const { data } = response.payload;

        switch (status) {
          case 200:
            setGames(data);
            break;
          // handle other errors later
        }
      } catch (error) {
        openErrorModal('An error occurred during a request.');
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    const errors: string[] = [];
    try {
      for (const selected of selectedGames) {
        console.log(selected);
        const response = await removeFromGamesLib(selected.gameId);
        if ('error' in response) {
          errors.push(response.error);
          continue;
        }
        console.log(response)
      }
    } catch (error) {
      openErrorModal('An error occurred during a request.');
    }

    if (errors.length > 0) {
      openErrorModal(errors.join('\n'));
    }
  };

  return (
    <Flex bg="gray.300" flexDir="column" p={4} gap={4}>
      <Text fontSize={24}>Delete Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />
      <GameSelector
        games={games}
        selectedGames={selectedGames}
        setSelectedGames={setSelectedGames}
      />
      <Button onClick={handleDelete}>Delete</Button>
    </Flex>
  );
};

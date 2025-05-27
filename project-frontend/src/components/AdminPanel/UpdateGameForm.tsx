import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { SetStateAction, useEffect, useState } from 'react';
import { Genres, AllPlatforms, AllTags } from '../../enums';
import { GenreSelector } from '../Selectors/GenreSelector';
import { PlatformSelector } from '../Selectors/PlatformSelector';
import { TagSelector } from '../Selectors/TagSelector';
import { Game, GameRef } from '../../interface';
import { useModal } from '../../context/ModalProvider';
import {
  getGameData,
  getGameIdentifiers,
  updateGameFromLib,
} from '../../api/game';
import { GameSelector } from '../Selectors/GameSelector';

export const UpdateGameForm = () => {
  /**
   * TODO: Take a game name / id or have a selector, with every game as an option
   * to set initial values
   **/

  // when adding in game selector, limit the selected games to the first one in the array
  const [gameData, setGameData] = useState<Game | null>(null);
  const [games, setGames] = useState<GameRef[]>([]);
  const [selectedGames, setSelectedGames] = useState<GameRef[]>([]);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [priceCents, setPriceCents] = useState<number>(0);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [platforms, setPlatforms] = useState<AllPlatforms[]>([]);
  const [tags, setTags] = useState<AllTags[]>([]);
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

  useEffect(() => {
    if (selectedGames.length <= 0) return;
    const fetchData = async () => {
      try {
        const response = await getGameData(selectedGames[0].gameId);
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
        // Make this cleaner
        setGameData(gameData);
        setName(gameData.name || '');
        setDescription(gameData.description || '');
        setImage(gameData.image || '');
        setReleaseDate(
          gameData.releaseDate ? new Date(gameData.releaseDate) : new Date()
        );
        setPriceCents(gameData.priceCents || 0);
        setDevelopers(gameData.developers || []);
        setPublishers(gameData.publishers || []);
        setGenres(gameData.genres || []);
        setPlatforms(gameData.platforms || []);
        setTags(gameData.tags || []);
      } catch (error) {
        openErrorModal('Failed to load game data. Please try again.');
      }
    };
    fetchData();
  }, [selectedGames]);

  const handleUpdate = async () => {
    if (!gameData) return;
    try {
      const updatedGameData = {
        ...gameData,
        name,
        description,
        image,
        releaseDate,
        priceCents,
        developers,
        publishers,
        genres,
        platforms,
        tags,
      };
      console.log('Updated Game Data:', updatedGameData);
      const response = await updateGameFromLib(
        gameData._id,
        updatedGameData
      );
      if ('error' in response) {
        openErrorModal(response.error);
        return;
      }

      const { status, payload } = response;
      if (status === 200) {
        window.location.reload();
        return;
      } else {
        const { error } = payload;
        openErrorModal(error || 'An unknown error occurred while updating the game.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      openErrorModal('An error occurred during authentication.');
    }
  };

  return (
    <Flex bg="gray.300" flexDir="column" p={4} gap={4}>
      <Text fontSize={24}>Update Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />

      {/* Game Selector - TODO: Add a selector to choose the game to update */}
      <GameSelector
        games={games}
        selectedGames={selectedGames}
        setSelectedGames={setSelectedGames}
        isMultiSelect={false}
      />
      {/* Ugly format too tired to refactor these*/}
      <Input
        placeholder="Name"
        value={name}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      {/* TODO: Use soemthing other than input to handle text wrapping */}
      <Input
        placeholder="Description"
        value={description}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setDescription(e.target.value)}
      ></Input>
      <Input
        placeholder="Image"
        value={image}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setImage(e.target.value)}
      ></Input>
      <Input
        placeholder="Release date"
        value={releaseDate.toISOString().split('T')[0]} // Format to YYYY-MM-DD
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) =>
          setReleaseDate(
            e.target.value ? new Date(e.target.value) : new Date(Date.now())
          )
        }
      ></Input>
      <Input
        placeholder="Price in cents"
        value={priceCents.toString()}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setPriceCents(Number(e.target.value))}
      ></Input>
      <Input
        placeholder="Developers - comma separated"
        value={developers.join(', ')}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setDevelopers(e.target.value.split(','))}
      ></Input>
      <Input
        placeholder="Publishers - comma separated"
        value={publishers.join(', ')}
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setPublishers(e.target.value.split(','))}
      ></Input>

      {/* Selectors - Can't be bothered separated the text and yadaayaddeedooo into components */}

      {/* Genre Selector */}
      <Flex gap={4} flexDir="row" justifyContent="space-between">
        <Text
          backgroundColor="white"
          minWidth="90%"
          minHeight="80px"
          border="solid"
          borderColor="black"
          borderRadius={5}
          borderWidth={1}
          padding={3}
        >
          {`Selected Genres: ${genres.join(', ')}`}
        </Text>
        <GenreSelector genres={genres} setGenres={setGenres} />
      </Flex>

      {/* Platforms Selector */}
      <Flex gap={4} flexDir="row" justifyContent="space-between">
        <Text
          backgroundColor="white"
          minWidth="90%"
          minHeight="80px"
          border="solid"
          borderColor="black"
          borderRadius={5}
          borderWidth={1}
          padding={3}
        >
          {`Selected Platforms: ${platforms.join(', ')}`}
        </Text>
        <PlatformSelector platforms={platforms} setPlatforms={setPlatforms} />
      </Flex>

      {/* Tags Selector */}
      <Flex gap={4} flexDir="row" justifyContent="space-between">
        <Text
          backgroundColor="white"
          minWidth="90%"
          minHeight="80px"
          border="solid"
          borderColor="black"
          borderRadius={5}
          borderWidth={1}
          padding={3}
        >
          {`Selected Tags: ${tags.join(', ')}`}
        </Text>
        <TagSelector tags={tags} setTags={setTags} />
      </Flex>

      <Button onClick={handleUpdate}>Update</Button>
    </Flex>
  );
};

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { Genres, AllPlatforms, AllTags } from '../../enums';
import { useState } from 'react';
import { GenreSelector } from '../Selectors/GenreSelector';
import { PlatformSelector } from '../Selectors/PlatformSelector';
import { TagSelector } from '../Selectors/TagSelector';
import { InitialGame } from '../../interface';
import { addToGamesLib } from '../../api/game';
import { useModal } from '../../context/ModalProvider';

export const AddGameForm = () => {
  // Could reduce with useReducer perchance.
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

  // TODO: Handle  errors later, not too  important right now
  const [ errors, setErrors ] = useState<string>('')
  const { openErrorModal } = useModal();

  const handleAdd = async () => {
    try {
      const gameData: InitialGame = {
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
      const response = await addToGamesLib(gameData);
      if ('error' in response) {
        openErrorModal(response.error);
        return;
      }

      const { status, payload } = response;
      if (status === 200) {
        window.location.reload()
        return;
      } else {
        const { error } = payload
        setErrors(error)
        console.log(error)
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      openErrorModal('An error occurred during authentication.');
    }
  };

  return (
    <Flex bg="gray.300" flexDir="column" p={4} width="100%" gap={4}>
      <Text fontSize={24}>Add Game</Text>

      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />

      {/* Ugly format too tired to refactor these*/}
      <Input
        placeholder="Name"
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      {/* TODO: Use soemthing other than input to handle text wrapping */}
      <Input
        placeholder="Description"
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setDescription(e.target.value)}
      ></Input>
      <Input
        placeholder="Image"
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setImage(e.target.value)}
      ></Input>
      <Input
        placeholder="Release date"
        defaultValue=""
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
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setPriceCents(Number(e.target.value))}
      ></Input>
      <Input
        placeholder="Developers - comma separated"
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setDevelopers(e.target.value.split(', '))}
      ></Input>
      <Input
        placeholder="Publishers - comma separated"
        defaultValue=""
        bg="white"
        borderColor="black"
        borderRadius={1}
        onChange={(e) => setPublishers(e.target.value.split(', '))}
      ></Input>

      {/* Selectors - Can't be bothered separated the text and yadaayaddeedooo into components */}

      {/* Genre Selector */}
      <Box>
        <Text fontSize={20} fontWeight="bold" mb={2}>
          Genres
        </Text>
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
      </Box>

      {/* Platforms Selector */}
      <Box>
        <Text fontSize={20} fontWeight="bold" mb={2}>
          Platforms
        </Text>
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
      </Box>

      {/* Tags Selector */}
      <Box>
        <Text fontSize={20} fontWeight="bold" mb={2}>
          Tags
        </Text>
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
      </Box>

      <Button onClick={handleAdd}>Add</Button>
    </Flex>
  );
};

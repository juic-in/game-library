import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Genres, AllPlatforms, AllTags } from '../../enums';
import { GenreSelector } from '../Selectors/GenreSelector';
import { PlatformSelector } from '../Selectors/PlatformSelector';
import { TagSelector } from '../Selectors/TagSelector';

export const UpdateGameForm = () => {
  /**
   * TODO: Take a game name / id or have a selector, with every game as an option
   * to set initial values
   **/

  // when adding in game selector, limit the selected games to the first one in the array

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

  return (
    <Flex bg="gray.300" flexDir="column" p={4} gap={4}>
      <Text fontSize={24}>Update Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />

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

      <Button
        onClick={() =>
          console.log(
            `Genres: ${genres}\nPlatforms: ${platforms}\nTags: ${tags}`
          )
        }
      >
        Add
      </Button>
    </Flex>
  );
};

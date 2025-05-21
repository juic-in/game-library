import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Genre, AllPlatforms, AllTags } from '../../enums';
import { GenreSelector } from '../Selectors/GenreSelector';
import { PlatformSelector } from '../Selectors/PlatformSelector';
import { TagSelector } from '../Selectors/TagSelector';

export const UpdateGameForm = () => {
  /**
   * TODO: Take a game name / id or have a selector, with every game as an option
   * to set initial values
   **/

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [priceCents, setPriceCents] = useState<number>(0);
  const [developers, setDevelopers] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
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

      {/* Selectors */}
      <GenreSelector setGenres={setGenres} />
      <PlatformSelector setPlatforms={setPlatforms} />
      <TagSelector setTags={setTags} />

      <Button onClick={() => console.log('update')}>Update</Button>
    </Flex>
  );
};

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Game } from '../../interface';

interface Props {
  gameData: Game;
}

export const GameInfo = ({ gameData }: Props) => {
  const {
    name,
    description,
    releaseDate,
    developers,
    publishers,
    genres,
    platforms,
    tags,
  } = gameData;
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  // Use userefs for scroll into view
  const sidebarContentItems = [
    {
      name: 'Description',
      onClick: () => console.log('scrolling to description'),
    },
    {
      name: 'Production',
      onClick: () => console.log('scrolling to production metadata'),
    },
    {
      name: 'Categories',
      onClick: () => console.log('scrolling to categories'),
    },
  ];

  return (
    <Flex
      className="main-content-container"
      flexDir="row"
      w="100%"
      h="100%"
      p={4}
      bg={bgColor}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      borderRadius="md"
    >
      <Flex
        className="info-main-container"
        flexDir="column"
        flex={1}
        px={2}
        gap={3}
      >
        <Box>
          <Text fontSize={30}>Description</Text>
          <Text>{description}</Text>
        </Box>
        <Box>
          <Text fontSize={30}>Production</Text>
          {/* Fix the release date */}
          <Text>Release Date: {Date()}</Text>
          <Text>Publishers: {publishers.join(', ')}</Text>
        </Box>
        <Box>
          <Text fontSize={30}>Categories</Text>
          <Text>Genres: {genres.join(', ')}</Text>
          <Text>Platforms: {platforms.join(', ')}</Text>
          <Text>Tags: {tags.join(', ')}</Text>
        </Box>
      </Flex>
      <Flex className="info-sidebar-container" flexDir="column" ml="auto">
        {sidebarContentItems.map((obj) => (
          <Button onClick={obj.onClick}>{obj.name}</Button>
        ))}
      </Flex>
    </Flex>
  );
};

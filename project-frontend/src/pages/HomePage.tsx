import { SimpleGrid, Box } from '@chakra-ui/react';
import { GameCard } from '../components/GameCard'; // Assuming the path is correct

export const HomePage = () => {
  const games = [
    { title: 'Game 1', description: 'This is a description for Game 1' },
    { title: 'Game 2', description: 'This is a description for Game 2' },
    { title: 'Game 3', description: 'This is a description for Game 3' },
    { title: 'Game 4', description: 'This is a description for Game 4' },
    { title: 'Game 5', description: 'This is a description for Game 5' },
    { title: 'Game 6', description: 'This is a description for Game 6' },
    { title: 'Game 7', description: 'This is a description for Game 7' },
    { title: 'Game 8', description: 'This is a description for Game 8' },
    { title: 'Game 9', description: 'This is a description for Game 9' },
    { title: 'Game 10', description: 'This is a description for Game 10' },
    { title: 'Game 11', description: 'This is a description for Game 11' },
  ];

  return (
    <Box p={2}>
      <SimpleGrid 
        columns={[1, 2, 3, 4, 5, 6]}  // Added `6` columns for large screens (2xl)
        spacing={[3, 4, 5]}  // Adjust spacing for different screen sizes
        mx="auto"  // Center the grid on larger screens
      >
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

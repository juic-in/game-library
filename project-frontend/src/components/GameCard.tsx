import { Box, Heading, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description: string;
  owned: boolean; // Whether the game is owned or not
  loggedIn: boolean; // Whether the user is logged in
}

export const GameCard = ({ title, description, owned, loggedIn }: Props) => {
  const cardHeight = '500px';
  const cardWidth = '280px';

  // Conditionally apply styles based on game ownership and user status
  let cardBg = 'white';
  let cardTextColor = 'gray.500';
  let opacity = 1;
  let cursor = 'pointer';

  // If user is logged in but doesn't own the game, gray out the card
  // TODO: add feature to negate this if an option is  selected
  if (loggedIn && !owned) {
    cardBg = 'gray.100';
    cardTextColor = 'gray.300';
    opacity = 0.5;
    cursor = 'not-allowed';
  }
  //
  return (
    <Box
      p={5}
      borderRadius="lg"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        boxShadow: '2xl',
        transform: 'scale(1.02)',
      }}
      bg={cardBg}
      height={cardHeight}
      width={cardWidth}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxW="sm"
      opacity={opacity}
      cursor={cursor}
    >
      <Box mt={2} textAlign="center">
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          mb={3}
          color={cardTextColor}
        >
          {title}
        </Heading>
        <Text flex="1" mb={3} color={cardTextColor}>
          {description}
        </Text>
      </Box>
      <Box mt={2} textAlign="center">
        <Text fontSize="sm" color={cardTextColor}>
          More Info
        </Text>
      </Box>
    </Box>
  );
};

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  image: string;
  owned: boolean; // Whether the game is owned or not
  loggedIn: boolean; // Whether the user is logged in
}

export const GameCard = ({ title, image, owned, loggedIn }: Props) => {
  const cardHeight = '550px';
  const cardWidth = '315px';
  console.log(title, image);
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
    <Flex
      m={2}
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
      <Box mt={4} textAlign="center">
        <Heading
          fontSize={{ base: 'l', md: 'xl' }}
          minHeight="55px"
          color={cardTextColor}
        >
          {title}
        </Heading>
      </Box>
      <Box
        height="2px"
        width="100%"
        bgGradient="linear(to-r, cyan.400, blue.500)"
      />
      <Box overflow="hidden">
        <Image src={image} objectFit="cover" w="100%" h="100%" />
      </Box>
      <Box
        height="2px"
        width="100%"
        bgGradient="linear(to-r, cyan.400, blue.500)"
      />
      <Box my={1} textAlign="center">
        <Text fontSize="sm" color={cardTextColor}>
          More Info
        </Text>
      </Box>
    </Flex>
  );
};

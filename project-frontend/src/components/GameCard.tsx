import { Box, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { GrAnalytics } from 'react-icons/gr';

interface Props {
  title: string;
  description: string;
}

export const GameCard = ({ title, description }: Props) => {
  const cardHeight = useBreakpointValue({ base: '500px', md: '600px' });

  // render normally if game is owned and the user is logged in,
  // else if user logged but not owned game,  render not owned as grayed out,
  // else render normally
  
  return (
    <Box
      p={5}
      borderRadius="lg"
      boxShadow="md"
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      _hover={{
        boxShadow: '2xl',
        transform: 'scale(1.02)',
      }}
      bg="white"
      height={cardHeight}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxW="sm"
    >
      <Box mt={2} textAlign="center">
        <Heading size="lg" mb={3} color="gray.500">
          {title}
        </Heading>
        <Text flex="1" mb={3} color="gray.500">
          {description}
        </Text>
      </Box>
      <Box mt={2} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          More Info
        </Text>
      </Box>
    </Box>
  );
};

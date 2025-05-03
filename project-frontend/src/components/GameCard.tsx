import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
}

export const GameCard = ({ title, description }: Props) => {
  const cardHeight = useBreakpointValue({ base: "400px", md: "500px" });

  return (
    <Box
      p={5}
      borderRadius="lg"
      boxShadow="md"
      _hover={{
        boxShadow: '2xl', 
        transform: 'scale(1.02)', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
      }}
      bg="white"
      height={cardHeight} 
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxW="sm" 
    >
      <Heading size="lg" mb={3}>{title}</Heading>
      <Text flex="1" mb={3}>{description}</Text>
      <Box mt={2} textAlign="center">
        <Text fontSize="sm" color="gray.500">More Info</Text>
      </Box>
    </Box>
  );
};

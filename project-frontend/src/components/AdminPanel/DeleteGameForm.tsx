import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const DeleteGameForm = () => {
  /**
   * TODO: Take a game name / id or have a selector, with every game as an option
   * to set initial values
   **/

  return (
    <Flex bg="gray.300" flexDir="column" p={4} gap={4}>
      <Text fontSize={24}>Delete Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />
      <Button onClick={() => console.log('delete')}>Delete</Button>
    </Flex>
  );
};

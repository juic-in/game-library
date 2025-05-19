import { Box, Button, Flex, Text } from '@chakra-ui/react';

export const UpdateGameForm = () => {
  return (
    <Flex bg="gray.300" flexDir="column" p={4}>
      <Text fontSize={24}>Update Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />
      <Button onClick={() => console.log('update')}>Update</Button>
    </Flex>
  );
};

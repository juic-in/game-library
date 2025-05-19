import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

export const AddGameForm = () => {
  return (
    <Flex bg="gray.300" flexDir="column" p={4} width="100%">
      <Text fontSize={24}>Add Game</Text>
      <Box
        height="3px"
        width="95%"
        bgGradient="linear(to-l, gray.300, gray.700)"
      />
      <Menu>
        <MenuButton as={Button} variant="outline" size="sm">
          Open
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => console.log('Option 1 clicked')}>
            Option 1
          </MenuItem>
          <MenuItem onClick={() => console.log('Option 2 clicked')}>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => console.log('Option 3 clicked')}>
            Option 3
          </MenuItem>
        </MenuList>
      </Menu>
      <Button onClick={() => console.log('add')}>Add</Button>
    </Flex>
  );
};

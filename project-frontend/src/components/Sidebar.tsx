import { Flex } from '@chakra-ui/react';

interface Props {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: Props) => {
  return (
    <Flex
      height="95vh"
      direction="column"
      bg="gray.800"
      color="white"
      w={isCollapsed ? '60px' : '200px'}
      transition="width 0.2s ease"
    >
      hi
    </Flex>
  );
};

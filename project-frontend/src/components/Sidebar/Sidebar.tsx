import { Box, VStack } from '@chakra-ui/react';
import { SidebarContent } from './SidebarContent';

interface Props {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: Props) => {
  return (
    <Box
      bg="gray.700"
      color="white"
      w={isCollapsed ? '60px' : '200px'}
      minH="100vh"
      transition="width 0.2s ease"
    >
      <VStack align="stretch" spacing={0}>
        <SidebarContent isCollapsed={isCollapsed} />
      </VStack>
    </Box>
  );
};

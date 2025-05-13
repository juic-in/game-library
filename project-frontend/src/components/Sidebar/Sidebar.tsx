import { Box, VStack } from '@chakra-ui/react';
import { SidebarContent } from './SidebarContent';
import { useEffect } from 'react';

interface Props {
  isCollapsed: boolean;
}

export const Sidebar = ({ isCollapsed }: Props) => {
  useEffect(() => {
    document.body.style.transition = 'margin-left 0.2s ease';
    document.body.style.marginLeft = isCollapsed ? '60px' : '140px';

    return () => {
      document.body.style.marginLeft = '0';
    };
  }, [isCollapsed]);

  return (
    <Box
      bg="gray.700"
      color="white"
      w={isCollapsed ? '60px' : '140px'}
      minH="100vh"
      transition="width 0.2s ease"
      position={'fixed'}
      left={0}
      zIndex={9}
      userSelect={'none'}
      onContextMenu={(e) => e.preventDefault()}
    >
      <VStack align="stretch" spacing={0}>
        <SidebarContent isCollapsed={isCollapsed} />
      </VStack>
    </Box>
  );
};

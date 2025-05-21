import { Box, VStack } from '@chakra-ui/react';
import { SidebarContent } from './SidebarContent';
import { useEffect } from 'react';

interface Props {
  isCollapsed: boolean;
}
/**
 * TODO: 
 *    Switch out the font, ugly ahhh font
 *    Add in gradient lines to separate the sidebar items? 
 * */ 
export const Sidebar = ({ isCollapsed }: Props) => {
  useEffect(() => {
    // document.body.style.transition = 'margin-left 0.2s ease';
    document.body.style.marginLeft = isCollapsed ? '60px' : '160px';

    return () => {
      document.body.style.marginLeft = '0';
    };
  }, [isCollapsed]);

  return (
    <Box
      bg="gray.800"
      color="white"
      w={isCollapsed ? '60px' : '160px'}
      h="100%"
      // transition="width 0.2s ease"
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

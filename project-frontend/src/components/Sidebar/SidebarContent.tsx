import { VStack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

interface Props {
  isCollapsed: boolean;
}

export const SidebarContent = ({ isCollapsed }: Props) => {
  return (
    <VStack align="stretch" spacing={2} mt={4}>
      <SidebarItem
        icon={FaHome}
        label="Home"
        isCollapsed={isCollapsed}
        route="/"
      />
      <SidebarItem
        icon={FaUser}
        label="Profile"
        isCollapsed={isCollapsed}
        route="/profile"
      />
      <SidebarItem
        icon={FaCog}
        label="Settings"
        isCollapsed={isCollapsed}
        route="/settings"
      />
    </VStack>
  );
};

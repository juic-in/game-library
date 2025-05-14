import { useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { FaHome, FaUser, FaCog, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Props {
  isCollapsed: boolean;
}

export const SidebarContent = ({ isCollapsed }: Props) => {
  const navigate = useNavigate();

  /**
   * Color Mode Toggles
   */
  const { toggleColorMode } = useColorMode()
  const toggleModeLabel = useColorModeValue('Dark-Mode', 'Light-Mode')
  const toggleModeIcon = useColorModeValue(FaMoon, FaSun);
  return (
    <VStack align="stretch" spacing={2} mt={4}>
      <SidebarItem
        icon={FaHome}
        label="Home"
        isCollapsed={isCollapsed}
        onClick={() => navigate('/')}
      />
      <SidebarItem
        icon={FaUser}
        label="Profile"
        isCollapsed={isCollapsed}
        onClick={() => navigate('/profile')}
      />
      <SidebarItem
        icon={FaCog}
        label="Settings"
        isCollapsed={isCollapsed}
        onClick={() => navigate('/settings')}
      />
      <SidebarItem
        icon={toggleModeIcon}
        label={toggleModeLabel}
        isCollapsed={isCollapsed}
        onClick={() => toggleColorMode()}
      />
    </VStack>
  );
};

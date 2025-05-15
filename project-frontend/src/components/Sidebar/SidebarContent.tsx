import { useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { HiOutlineHome } from 'react-icons/hi2';
import { FiSettings, FiUser, FiSun, FiMoon, FiSearch } from 'react-icons/fi';

interface Props {
  isCollapsed: boolean;
}

export const SidebarContent = ({ isCollapsed }: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Color Mode Toggles
  const { toggleColorMode } = useColorMode();
  const toggleModeLabel = useColorModeValue('Dark-Mode', 'Light-Mode');
  const toggleModeIcon = useColorModeValue(FiMoon, FiSun);

  // Rendering SideBar Items
  const sidebarItems = [
    {
      icon: HiOutlineHome,
      label: 'Home',
      onClick: () => navigate('/'),
      requiresAuth: false,
    },
    {
      icon: FiSearch,
      label: 'Discover',
      onClick: () => navigate('/discover'),
      requiresAuth: false,
    },
    {
      icon: FiUser,
      label: 'Profile',
      onClick: () => navigate('/profile'),
      requiresAuth: true,
    },
    {
      icon: FiSettings,
      label: 'Settings',
      onClick: () => navigate('/settings'),
      requiresAuth: true,
    },
    {
      icon: toggleModeIcon,
      label: toggleModeLabel,
      onClick: () => toggleColorMode(),
      requiresAuth: false,
    },
  ];
  return (
    <VStack align="stretch" spacing={2} mt={4}>
      {sidebarItems.map((item, index) => {
        if (item.requiresAuth && !isAuthenticated) {
          return null; // Skip rendering if authentication is required and not authenticated
        }
        // Render the SidebarItem component
        return (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            onClick={item.onClick}
          />
        );
      })}
    </VStack>
  );
};

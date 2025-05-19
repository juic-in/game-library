import { useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';
import {
  FiSettings,
  FiUser,
  FiSun,
  FiMoon,
  FiSearch,
  FiTool,
} from 'react-icons/fi';
import { useAuth, User } from '../../context/AuthProvider';

interface Props {
  isCollapsed: boolean;
}

export const SidebarContent = ({ isCollapsed }: Props) => {
  const { isAuthenticated, user } = useAuth();
  let isAdmin = false;
  if (user) {
    isAdmin = user.isAdmin;
  }
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
    {
      icon: FiTool,
      label: 'Admin Panel',
      onClick: () => navigate('/admin'),
      requiresAuth: true,
      requiresAdmin: true,
    },
  ];
  return (
    <VStack align="stretch" spacing={2} mt={4}>
      {sidebarItems.map((item, index) => {
        if (
          (item.requiresAuth && !isAuthenticated) ||
          (item.requiresAdmin && !isAdmin)
        ) {
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

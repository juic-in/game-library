import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface Props {
  isCollapsed: boolean;
  label: string;
  icon: IconType;
  route: string;
}

export const SidebarItem = ({ icon, label, isCollapsed, route }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(route)}
      cursor="pointer"
      _hover={{ bg: 'gray.700' }}
      px={4}
      py={2}
      borderRadius="md"
      role="group"
    >
      <HStack spacing={4}>
        <Icon as={icon} boxSize={5} />
        {!isCollapsed && (
          <Text fontSize="md" _groupHover={{ color: 'teal.300' }}  lineHeight="1">
            {label}
          </Text>
        )}
      </HStack>
    </Box>
  );
};

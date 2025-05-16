import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface Props {
  isCollapsed: boolean;
  label: string;
  icon: IconType | any;
  onClick: () => void;
}

export const SidebarItem = ({ icon, label, isCollapsed, onClick }: Props) => {
  return (
    <Box
      className="sidebar-item"
      onClick={onClick}
      cursor="pointer"
      _hover={{ bg: 'gray.700' }}
      px={4}
      py={2}
      borderRadius="md"
      role="group"
    >
      <Flex gap={4} align="center">
        <Icon as={icon} boxSize={5} ml={1}/>

        {!isCollapsed && (
          <Text
            fontSize="md"
            _groupHover={{ color: 'teal.300' }}
            lineHeight="1"
          >
            {label}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  toggleSidebar: () => void;
}

export const Navbar = ({ toggleSidebar }: Props) => {
  // Get the current color mode (light or dark)
  const iconColor = useColorModeValue('black', 'white'); // White in dark mode, black in light mode

  return (
    <>
      <Container maxW={'1440px'} px={6}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDir={{ base: 'column', sm: 'row' }}
        >
          {/* Sidebar Toggle Box (left side) */}
          <Box
            as="div"
            onClick={toggleSidebar}
            w="40px" // Width of the box
            h="40px" // Height of the box
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" // Makes it clickable
          >
            {/* Hamburger icon color based on light/dark mode */}
            <HamburgerIcon color={iconColor} />
          </Box>

          {/* Logo (centered) */}
          <Text
            fontSize={{ base: '22', sm: '28' }}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
            bgGradient={'linear(to-r, cyan.400, blue.500)'}
            bgClip={'text'}
            flex="1"
            display="flex"
            justifyContent="center"
          >
            <Link to={'/'}>GameXUnify</Link>
          </Text>

          {/* Empty Box (right side) to balance the layout */}
          <Box w="40px" /> {/* This keeps the layout balanced on both sides */}
        </Flex>
      </Container>
    </>
  );
};

import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  toggleSidebar: () => void;
}

export const Navbar = ({ toggleSidebar }: Props) => {
  const iconColor = useColorModeValue('black', 'white'); // White in dark mode, black in light mode

  return (
    <>
      <Container minW={'100%'} px={0}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDir={{ base: 'column', sm: 'row' }}
        >
          <Box
            as="div"
            onClick={toggleSidebar}
            w="60px" // Width of the box
            h="40px" // Height of the box
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer" // Makes it clickable
          >
            <HamburgerIcon color={iconColor} w={'60px'}/>
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

          <Box w="40px" /> 
        </Flex>
      </Container>
      <Box height="2px" width="100%" bgGradient="linear(to-r, cyan.400, blue.500)" />
    </>
  );
};

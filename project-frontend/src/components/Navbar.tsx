import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  toggleSidebar: () => void;
}


export const Navbar = ({ toggleSidebar }: Props) => {
  useEffect(() => {
      // Header height + Gradient bar height
      document.body.style.marginTop = '65px';
  
      return () => {
        document.body.style.marginTop = '0';
      };
    }, []);

  return (
    <>
      <Container
        minW={'100%'}
        px={0}
        position={'fixed'}
        top={0}
        zIndex={10}
        bg="black"
        left={0}
      >
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
            userSelect={'none'}
            onContextMenu={(e) => e.preventDefault()}
          >
            <HamburgerIcon color='white' w={'60px'} />
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
            userSelect={'none'}
          >
            <Link to={'/'}>GameXUnify</Link>
          </Text>

          {/* <Box w="40px" /> */}
        </Flex>
        <Box
          height="3px"
          width="100%"
          bgGradient="linear(to-r, cyan.400, blue.500)"
        />
      </Container>
    </>
  );
};

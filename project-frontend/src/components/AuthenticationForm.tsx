import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { login, register } from '../api/auth';
import { useModal } from '../context/ModalProvider';

interface Credentials {
  email: string;
  username?: string;
  password: string;
}

interface Props {
  mode: string;
}

export const AuthenticationForm = ({ mode }: Props) => {
  const [formData, setFormData] = React.useState<Credentials>({
    email: '',
    username: '',
    password: '',
  });
  const { openErrorModal } = useModal();
  const authMethod = mode === 'login' ? login : register;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    } catch (error) {
      openErrorModal('An error occurred during authentication.');
    }
  };

  return (
    <Flex
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      flexDir="column"
      alignItems="center"
      // justifyContent="center"
      height="700px"
      width="650px"
      backgroundColor="white"
      color="black"
      boxShadow="md"
      borderRadius="md"
      borderWidth={4}
      borderColor="gray.300"
      zIndex={9999}
    >
      <Heading m={12} textAlign="center">
        {mode.toUpperCase()}
      </Heading>

      <Box
        height="3px"
        width="90%"
        bgGradient="linear(to-r, gray.300, gray.700)"
      />

      <Flex as="form" px={16} py={20} w="100%" flexDirection="column">
        {/* Conditional rendering for email block */}
        {mode === 'register' && (
          <Box mb={4}>
            <Text mb={2} display="inline-block">
              Email
            </Text>
            <Input type="text" name="email" required borderColor="gray.300" />
          </Box>
        )}
        <Box mb={4}>
          <Text mb={2} display="inline-block">
            Username
          </Text>
          <Input type="text" name="username" required borderColor="gray.300" />
        </Box>
        <Box mb={4}>
          <Text mb={2} display="inline-block">
            Password
          </Text>
          <Input
            type="password"
            name="password"
            required
            borderColor="gray.300"
          />
        </Box>
        <Box position="fixed" bottom={32}>
          <Button
            type="submit"
            bgGradient="linear(to-t, gray.200, gray.300)"
            color="black"
            width="100px"
          >
            {mode.toUpperCase()}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

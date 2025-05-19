import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { authLogin, authRegister } from '../api/auth';
import { useModal } from '../context/ModalProvider';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Credentials {
  username?: string;
  email: string;
  password: string;
}

interface Errors {
  username: string;
  email: string;
  password: string;
}

interface Props {
  mode: string;
}

export const AuthenticationForm = ({ mode }: Props) => {
  const { login } = useAuth();
  const authMethod = mode === 'login' ? authLogin : authRegister;

  // Disable access to this page if already logged in
  let navigate = useNavigate();

  const [formData, setFormData] = React.useState<Credentials>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState<Errors>({
    username: '',
    email: '',
    password: '',
  });

  const { openErrorModal } = useModal();

  const handleErrors = (message: string) => {
    const errorMessages: Errors = {
      username: '',
      email: '',
      password: '',
    };
    if (message.toLowerCase().includes('email')) {
      errorMessages.email = message;
    }
    if (message.toLowerCase().includes('password')) {
      errorMessages.password = message;
    }
    if (message.toLowerCase().includes('username')) {
      errorMessages.username = message;
    }

    setErrors(errorMessages);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear errors on change of input, i hate websites that keep error messages even after i change the input
    setErrors({
      username: '',
      email: '',
      password: '',
    });
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await authMethod(formData as Required<typeof formData>);

      // If is not an error from the backend
      if ('error' in response) {
        openErrorModal(response.error);
        return;
      } 
      const { data, success } = response.payload;
      // No switch statement for status, since authentication is either true or false
      if (success) {
        login();
        navigate('/');
      } else {
        handleErrors(data.error);
        return;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
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
      zIndex={0}
    >
      <Heading m={12} textAlign="center">
        {mode.toUpperCase()}
      </Heading>

      <Box
        height="3px"
        width="90%"
        bgGradient="linear(to-r, gray.300, gray.700)"
      />

      <Flex
        as="form"
        px={16}
        py={14}
        w="100%"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        {/* Conditional rendering for username block */}
        {mode === 'register' && (
          <Box className="name-authentication-block">
            <Text mb={2} display="inline-block">
              Username
            </Text>
            <Input
              type="text"
              name="username"
              required
              borderColor="gray.300"
              onChange={handleInputChange}
            />
            <Text
              className="error-text"
              minHeight="25px"
              color="red.500"
              my={3}
            >
              {errors.username && errors.username}
            </Text>
          </Box>
        )}
        <Box className="email-authentication-block">
          <Text mb={2} display="inline-block">
            Email
          </Text>
          <Input
            type="text"
            name="email"
            required
            borderColor="gray.300"
            onChange={handleInputChange}
          />
          {/* Could turn these into components */}
          <Text className="error-text" minHeight="25px" color="red.500" my={3}>
            {errors.email && errors.email}
          </Text>
        </Box>

        <Box className="password-authentication-block">
          <Text mb={2} display="inline-block">
            Password
          </Text>
          <Input
            type="password"
            name="password"
            required
            borderColor="gray.300"
            onChange={handleInputChange}
          />
          <Text className="error-text" minHeight="25px" color="red.500" my={3}>
            {errors.password && errors.password}
          </Text>
        </Box>
        <Box position="fixed" bottom={20}>
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

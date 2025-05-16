// ErrorModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react';
import { useModal } from '../context/ModalProvider';

export const ErrorModal = () => {
  const { isOpen, errorMessage, closeErrorModal } = useModal();

  return (
    <Box zIndex={100000}>
      <Modal isOpen={isOpen} onClose={closeErrorModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>
            <p>{errorMessage || 'An unknown error occurred.'}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeErrorModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

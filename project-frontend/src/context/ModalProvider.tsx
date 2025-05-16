import { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  errorMessage: string;
  openErrorModal: (message: string) => void;
  closeErrorModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorModal = (message: string) => {
    setErrorMessage(message);
    setIsOpen(true);
  };

  const closeErrorModal = () => {
    setIsOpen(false);
    setErrorMessage('');
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, errorMessage, openErrorModal, closeErrorModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
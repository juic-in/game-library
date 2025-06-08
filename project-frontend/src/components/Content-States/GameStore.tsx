import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Game } from '../../interface';
import { useAuth, User } from '../../context/AuthProvider';
import { GameOwnedState } from '../../enums';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalProvider';
import { checkIfOwned, checkIfWished } from '../../api/users';

interface Props {
  game: Game;
}

const { openErrorModal } = useModal();

const checkWishlistState = async (gameId: string) => {
  try {
    const response = await checkIfWished(gameId);
    if ('error' in response) {
      openErrorModal(response.error);
      return
    }
    if (response.payload.success) return true
  } catch (error) {
    openErrorModal('Unexpected Error')
  }
  return false;
};

const checkOwnedState = async (gameId: string) => {
  try {
    const response = await checkIfOwned(gameId);
    if ('error' in response) {
      openErrorModal(response.error);
      return
    }
    if (response.payload.success) return true
  } catch (error) {
    openErrorModal('Unexpected Error')
  }
  return false;
};

export const GameStore = ({ game }: Props) => {
  const [gameOwnershipState, setGameOwnershipState] = useState<GameOwnedState>(
    GameOwnedState.NotOwned
  );
  // const [loading, setLoading] = useState<boolean>(true);

  const bgColour = useColorModeValue('gray.100', 'gray.700');
  const buttonColor = useColorModeValue('gray.200', 'gray.800');

  const { user } = useAuth();
  const { userId } = user as User;
  const { gameId } = game;

  useEffect(() => {
    const initialiseState = async () => {
      const ownedState = await checkOwnedState(gameId);
      if (!ownedState) {
        setGameOwnershipState(GameOwnedState.NotOwned);
      } else {
        setGameOwnershipState(GameOwnedState.Owned);
        return;
      }

      // Determine if wishlisted or not
      const wishlistState = await checkWishlistState(gameId);
      if (wishlistState) setGameOwnershipState(GameOwnedState.Wishlisted);
    };
    initialiseState();
  }, []);


  return (
    <Flex
      className="main-content-container"
      flexDir="row"
      w="100%"
      h="100%"
      p={4}
      bg={bgColour}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
      borderRadius="md"
    ></Flex>
  );
};

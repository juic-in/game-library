import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Game } from '../../interface';
import { useAuth, User } from '../../context/AuthProvider';
import { GameOwnedState } from '../../enums';
import { useEffect, useState } from 'react';

interface Props {
  game: Game;
}

const checkWishlistState = async (userId, gameId) => {
  // call wishlist verify route
  return false;
};

const checkOwnedState = async (userId, gameId) => {
  // call ownedGames verify route
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
      const ownedState = await checkOwnedState(userId, gameId);
      if (!ownedState) {
        setGameOwnershipState(GameOwnedState.NotOwned);
      } else {
        setGameOwnershipState(GameOwnedState.Owned);
        return;
      }

      // Determine if wishlisted or not
      const wishlistState = await checkWishlistState(userId, gameId);
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

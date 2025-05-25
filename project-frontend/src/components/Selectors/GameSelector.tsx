import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Input,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { getGameIdentifiers } from '../../api/game';
import { Genres } from '../../enums';
import { useModal } from '../../context/ModalProvider';
import { GameRef } from '../../interface';

interface Props {
  games: GameRef[];
  selectedGames: GameRef[];
  setSelectedGames: Dispatch<SetStateAction<GameRef[]>>;
}

export const GameSelector = ({
  games,
  selectedGames,
  setSelectedGames,
}: Props) => {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () =>
      games.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())),
    [search, games]
  );
  return (
    <Box bg="white" w="max-content" h="max-content" borderRadius={1}>
      <Menu closeOnSelect={false} closeOnBlur={false}>
        <MenuButton
          as={Button}
          variant="outline"
          size="sm"
          borderColor="black"
          borderRadius={1}
        >
          {selectedGames.length
            ? `${selectedGames.length} selected`
            : 'Select Games'}
        </MenuButton>

        <MenuList minW="240px" maxH="250px" overflowY="auto" p={2}>
          {/* search box – keep pointer events enabled so typing won’t close menu */}
          <Input
            placeholder="Search…"
            size="sm"
            mb={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <MenuOptionGroup
            type="checkbox"
            value={selectedGames.map((g) => g.gameId)}
            onChange={(selectedIds) => {
              const selectedGameObjects = games.filter((g) =>
                selectedIds.includes(g.gameId)
              );
              setSelectedGames(selectedGameObjects);
            }}
          >
            {filtered.map((g) => (
              <MenuItemOption key={g.gameId} value={g.gameId}>
                {g.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

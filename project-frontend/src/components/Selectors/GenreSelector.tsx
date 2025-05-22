import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  Box,
  MenuOptionGroup,
  Input,
  MenuItemOption,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Genres } from '../../enums';

interface Props {
  genres: Genres[]
  setGenres: Dispatch<SetStateAction<Genres[]>>;
}

export const GenreSelector = ({ genres, setGenres }: Props) => {
  const [search, setSearch] = useState('');

  const allGenres = Object.values(Genres).sort();
  // simple client-side filter
  const filtered = useMemo(
    () =>
      allGenres.filter((g) => g.toLowerCase().includes(search.toLowerCase())),
    [search]
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
          {genres.length ? `${genres.length} selected` : 'Select Genres'}
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
            value={genres}
            onChange={(v) => {
              setGenres(v as Genres[])
            }}
          >
            {filtered.map((g) => (
              <MenuItemOption key={g} value={g}>
                {g}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { AllPlatforms, CloudPlatforms, ConsolePlatforms, LegacyPlatforms, MobilePlatforms, PCPlatforms } from '../../enums';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  Input,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';

interface Props {
  platforms: AllPlatforms[];
  setPlatforms: Dispatch<SetStateAction<AllPlatforms[]>>;
}

export const PlatformSelector = ({ platforms, setPlatforms }: Props) => {
  const [search, setSearch] = useState('');

  const allGenres = [
    ...Object.values(PCPlatforms),
    ...Object.values(ConsolePlatforms),
    ...Object.values(MobilePlatforms),
    ...Object.values(LegacyPlatforms),
    ...Object.values(CloudPlatforms),

  ].sort()
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
          {platforms.length
            ? `${platforms.length} selected`
            : 'Select Platforms'}
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
            value={platforms}
            onChange={(v) => {
              setPlatforms(v as AllPlatforms[]);
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

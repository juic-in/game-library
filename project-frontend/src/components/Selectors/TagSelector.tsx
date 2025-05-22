import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import {
  AestheticTags,
  AllTags,
  AudienceTags,
  FeatureTags,
  GameplayTags,
  MechanicTags,
  PerspectiveTags,
  ThemeTags,
} from '../../enums';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  Box,
  Input,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';

interface Props {
  tags: AllTags[];
  setTags: Dispatch<SetStateAction<AllTags[]>>;
}

export const TagSelector = ({ tags, setTags }: Props) => {
  // Sphagetti code incoming

  const [search, setSearch] = useState('');
  const allTags = [
    ...Object.values(GameplayTags),
    ...Object.values(ThemeTags),
    ...Object.values(MechanicTags),
    ...Object.values(PerspectiveTags),
    ...Object.values(AestheticTags),
    ...Object.values(FeatureTags),
    ...Object.values(AudienceTags),
  ].sort();

  const filtered = useMemo(
    () => allTags.filter((g) => g.toLowerCase().includes(search.toLowerCase())),
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
          {tags.length ? `${tags.length} selected` : 'Select Tags'}
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
            value={tags}
            onChange={(v) => {
              setTags(v as AllTags[]);
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

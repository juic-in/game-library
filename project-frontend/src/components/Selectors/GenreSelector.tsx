import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Genre } from "../../enums";

interface Props {
  setGenres: Dispatch<SetStateAction<Genre[]>>;
}

export const GenreSelector = ({ setGenres }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="outline" size="sm">
        Select Genres
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log('Option 1 clicked')}>
          Option 1
        </MenuItem>
        <MenuItem onClick={() => console.log('Option 2 clicked')}>
          Option 2
        </MenuItem>
        <MenuItem onClick={() => console.log('Option 3 clicked')}>
          Option 3
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

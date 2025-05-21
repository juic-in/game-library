import { Dispatch, SetStateAction } from 'react';
import { AllPlatforms } from '../../enums';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';

interface Props {
  setPlatforms: Dispatch<SetStateAction<AllPlatforms[]>>;
}

export const PlatformSelector = ({ setPlatforms }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="outline" size="sm">
        Select Platforms
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

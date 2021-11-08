import React from 'react';
import {
  Menu,
  MenuButton,
  Button,
  ChevronDownIcon,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

export default function MenuEstudios() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}

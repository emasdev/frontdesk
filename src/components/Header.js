import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { Text, Button } from '@chakra-ui/react';

export default function Header() {
  const { user, signout } = useAuth();
  return (
    <Flex justifyContent="right">
      <Text mr={4}>{user.email}</Text>
      <Button onClick={signout}>Salir</Button>
    </Flex>
  );
}

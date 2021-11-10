import React from 'react';
import Lista from './Lista';
import { Box } from '@chakra-ui/react';
import AgregarPacienteButton from './AgregarPacienteButton';

export default function Dashboard() {
  return (
    <Box>
      <AgregarPacienteButton />
      <Lista />
    </Box>
  );
}

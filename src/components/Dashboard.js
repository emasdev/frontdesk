import React, { useState, useEffect, createContext } from 'react';
import Lista from './Lista';
import { Box } from '@chakra-ui/react';
import NuevoPacienteBtn from './NuevoPacienteBtn';
import Eventos from './Eventos';

export default function Dashboard() {
  return (
    <Box>
      <NuevoPacienteBtn />
      <Eventos />
    </Box>
  );
}

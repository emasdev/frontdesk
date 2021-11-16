import React, { useState, useEffect, createContext, useContext } from 'react';
import Lista from './Lista';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import NuevoPacienteBtn from './NuevoPacienteBtn';
import Eventos from './Eventos';
import NavContext from '../context/NavContext';

export default function Dashboard() {
  return (
    <Box>
      <Stack direction="row">
        <NuevoPacienteBtn />
        <AgendarPacienteBtn />
      </Stack>

      <Eventos />
    </Box>
  );
}

function AgendarPacienteBtn({ onClick }) {
  const { setSection } = useContext(NavContext);
  return <Button onClick={() => setSection('Agenda')}>Agendar Paciente</Button>;
}

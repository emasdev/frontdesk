import React, { useState, useEffect, createContext, useContext } from 'react';
import Lista from './Lista';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import NuevoPacienteBtn from './NuevoPacienteBtn';
import Eventos from './Eventos';
import NavContext from '../context/NavContext';
import AgendarAhoraBtn from './AgendarBtn';

export default function Inicio() {
  return (
    <Box>
      <Stack direction="row"></Stack>
      <AgendarAhoraBtn>Registrar Paciente</AgendarAhoraBtn>
      <Eventos />
    </Box>
  );
}

function AgendarPacienteBtn({ onClick }) {
  const { setSection } = useContext(NavContext);
  return <Button onClick={() => setSection('Agenda')}>Agendar cita</Button>;
}

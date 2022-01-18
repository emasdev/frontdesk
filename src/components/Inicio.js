import React, { useState, useEffect, createContext, useContext } from 'react';
import Lista from './Lista';
import { Box, Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import NuevoPacienteBtn from './NuevoPacienteBtn';
import Eventos from './Eventos';
import NavContext from '../context/NavContext';
import AgendarDrawer from './AgendarDrawer';

export default function Inicio() {
  const { setSection } = useContext(NavContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerTitle = 'Registrar paciente';

  const [evento, setEvento] = useState(null);
  return (
    <>
      <Stack direction="row" mb={4}>
        <Button onClick={onOpen}>{drawerTitle}</Button>
        <Button onClick={() => setSection('Agenda')}>Agendar cita</Button>
      </Stack>

      <Eventos />
      <AgendarDrawer
        isOpen={isOpen}
        onClose={onClose}
        title={drawerTitle}
        displayFechaNacimiento={true}
      />
    </>
  );
}

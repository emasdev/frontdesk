import React, { useEffect, useContext, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
} from '@chakra-ui/react';
import AgregarListaPreciosBtn from './AgregarListaPreciosBtn';
import AppContext from '../context/AppContext';
import EditarListaPreciosDrawer from './EditarListaPreciosDrawer';

export default function Doctores() {
  const { catalogo } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelected = item => {
    setSelected(item);
    onOpen();
  };

  return (
    <>
      <AgregarListaPreciosBtn />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
          </Tr>
        </Thead>
        <Tbody>
          {catalogo.listas_precios &&
            catalogo.listas_precios.map(lista => {
              return (
                <Tr key={lista.id} onClick={() => handleSelected(lista)}>
                  <Td>{lista.titulo}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <EditarListaPreciosDrawer
        isOpen={isOpen}
        onClose={onClose}
        doctor={selected}
      />
    </>
  );
}

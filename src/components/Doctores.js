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
import AgregarDoctorBtn from './AgregarDoctorBtn';
import AppContext from '../context/AppContext';
import EditarDoctorDrawer from './EditarDoctorDrawer';

export default function Doctores() {
  const { usuarios } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelected = item => {
    setSelected(item);
    onOpen();
  };

  return (
    <>
      <AgregarDoctorBtn />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellidos</Th>
            <Th>Teléfono</Th>
            <Th>Dirección</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios &&
            usuarios.map(usuario => {
              return (
                <Tr key={usuario.id} onClick={() => handleSelected(usuario)}>
                  <Td>{usuario.nombre}</Td>
                  <Td>
                    {usuario.apellido_paterno} {usuario.apellido_materno}
                  </Td>
                  <Td>{usuario.tel}</Td>
                  <Td>{usuario.dir_consultorio && usuario.dir_consultorio}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <EditarDoctorDrawer isOpen={isOpen} onClose={onClose} doctor={selected} />
    </>
  );
}

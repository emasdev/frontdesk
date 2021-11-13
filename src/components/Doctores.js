import React, { useEffect, useContext } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import AgregarDoctorBtn from './AgregarDoctorBtn';
import AppContext from '../context/AppContext';

export default function Doctores() {
  const { usuarios } = useContext(AppContext);
  return (
    <>
      <AgregarDoctorBtn />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellidos</Th>
            <Th>Teléfono</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios &&
            usuarios.map(usuario => {
              return (
                <Tr key={usuario.id}>
                  <Td>{usuario.nombre}</Td>
                  <Td>
                    {usuario.apellido_paterno} {usuario.apellido_materno}
                  </Td>
                  <Td>{usuario.tel}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

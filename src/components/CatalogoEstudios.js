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
import AgregarEstudioBtn from './AgregarEstudioBtn';
import AppContext from '../context/AppContext';

export default function Doctores() {
  const { catalogo } = useContext(AppContext);
  const { estudios } = catalogo;

  return (
    <>
      <AgregarEstudioBtn />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Estudio</Th>
            {/* <Th>Duración</Th> */}
            {/* <Th>Teléfono</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {estudios &&
            estudios.map(estudio => {
              console.log(estudio);
              // return (
              //   <Tr key={catalogo.id}>
              //     <Td>{usuario.nombre}</Td>
              //     <Td>
              //       {usuario.apellido_paterno} {usuario.apellido_materno}
              //     </Td>
              //     <Td>{usuario.tel}</Td>
              //   </Tr>
              // );
            })}
        </Tbody>
      </Table>
    </>
  );
}

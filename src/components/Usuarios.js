import React, { useEffect, useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import AppContext from '../context/AppContext';

export default function Usuarios() {
  const { usuarios } = useContext(AppContext);
  return (
    <>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellidos</Th>
            <Th>Teléfono</Th>
          </Tr>
        </Thead>
        <Tbody>
          {console.log('mostrar usuarios')}
          {usuarios &&
            usuarios.map(usuario => {
              console.log(usuario);
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

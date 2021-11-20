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
  const { estudios, listas_precios } = catalogo;
  console.log(catalogo);

  return (
    <>
      <AgregarEstudioBtn />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Estudio</Th>
            {listas_precios &&
              listas_precios.map(lista => {
                console.log(lista);
                return <Th key={lista.id}>{lista.titulo}</Th>;
              })}
          </Tr>
        </Thead>
        <Tbody>
          {estudios &&
            estudios.map(estudio => {
              console.log(estudio);
              return (
                <Tr key={estudio.id}>
                  <Td>{estudio.nombre}</Td>
                  {estudio.precios.map(precio => {
                    return <Td>{precio.precio}</Td>;
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

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

export default function CatalogoEstudios() {
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
                return <Th key={lista.id}>{lista.titulo}</Th>;
              })}
          </Tr>
        </Thead>
        <Tbody>
          {estudios &&
            estudios.map(estudio => {
              return (
                <Tr key={estudio.nombre}>
                  <Td>{estudio.nombre}</Td>
                  {estudio.precios.map(precio => {
                    return <Td key={precio.lista_precios}>{precio.precio}</Td>;
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

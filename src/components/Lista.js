import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';
import AppContext from '../context/AppContext';
import { useContext } from 'react';

//import { FirestoreService } from '../helpers/FirestoreService';

export default function Lista() {
  return (
    <>
      <Input type="date" />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Estudio</Th>
            <Th>Hora</Th>
            <Th>Paciente</Th>
            <Th>Doctor</Th>
            <Th>Total</Th>
            <Th>Pago</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>0001</Td>
            <Td>9:45am</Td>
            <Td>Rinoa Leonheart</Td>
            <Td>Herman Hesse</Td>
            <Td>$100</Td>
            <Td>Pagado</Td>
            <Td>Terminado</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

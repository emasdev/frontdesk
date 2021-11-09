import { Table, Thead, Tbody, Tr, Th, Td, Select } from '@chakra-ui/react';

//import { FirestoreService } from '../helpers/FirestoreService';

export default function Lista({ estudios }) {
  //const db = FirestoreService();

  return (
    <>
      <Select placeholder="Fecha">
        <option value="option1">8 de noviembre del 2021</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
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

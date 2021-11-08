import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

//import { FirestoreService } from '../helpers/FirestoreService';

export default function ListaEstudios({ estudios }) {
  //const db = FirestoreService();

  return (
    <>
      <Text fontWeight="bold" mb={4}>
        Lista de estudios
      </Text>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Estudio</Th>
            <Th>Paciente</Th>
            <Th>Doctor</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {estudios &&
            estudios.map(data => {
              return (
                <Tr key={data.id}>
                  <Td>{data.estudio}</Td>
                  <Td>{data.paciente}</Td>
                  <Td>{data.doctor}</Td>
                  <Td>{new Date(data.fecha).toString()}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

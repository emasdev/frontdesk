import React, { useEffect, useContext } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import AppContext from '../context/AppContext';
import moment from 'moment';

export default function Eventos() {
  const { eventos } = useContext(AppContext);
  return (
    <>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Hora</Th>
            <Th>Paciente</Th>
            <Th>Doctor</Th>
            <Th>Total</Th>
            <Th>Pago</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {eventos &&
            eventos.map(evento => {
              console.log(evento);
              return (
                <Tr key={evento.id}>
                  <Td>{moment(evento.start).format('HH:mm')}</Td>
                  <Td>
                    {evento.extendedProps.nombre}{' '}
                    {evento.extendedProps.apellidos}
                  </Td>
                  <Td>
                    {evento.extendedProps.doctor.nombre}{' '}
                    {evento.extendedProps.doctor.apellido_paterno}{' '}
                    {evento.extendedProps.doctor.apellido_materno}
                  </Td>
                  <Td>Total</Td>
                  <Td>Pago</Td>
                  <Td>Estado</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
}

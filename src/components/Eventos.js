import React, { useEffect, useContext, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Stack,
} from '@chakra-ui/react';
import AppContext from '../context/AppContext';
import moment from 'moment';

export default function Eventos() {
  const { eventos } = useContext(AppContext);
  const todayDate = moment().format('YYYY-MM-DD');
  const [eventosPorDia, setEventosPorDia] = useState(null);

  const filterEventosPorDia = date => {
    if (eventos) {
      const eventosDia = [];
      eventos.map(evento => {
        const eventoStart = moment(evento.start);
        const compareDate = moment(date);
        console.log(eventoStart.diff(compareDate, 'days'));
        if (eventoStart.diff(compareDate, 'days') == 0) {
          eventosDia.push(evento);
        }
      });
      setEventosPorDia(eventosDia);
    }
  };

  useEffect(() => {
    filterEventosPorDia(todayDate);
  }, [eventos]);

  const handleDate = e => {
    console.log(e.target.value);
  };
  return (
    <>
      <Stack direction="row" my={3}>
        <Input type="date" onChange={handleDate} value={todayDate} />
      </Stack>

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
          {eventosPorDia &&
            eventosPorDia.map(evento => {
              const horario = moment(evento.start).format('HH:mm');
              const paciente = `${evento.extendedProps.nombre} ${evento.extendedProps.apellidos}`;
              let doctor = '- Sin Doctor -';
              if (evento.extendedProps.doctor) {
                doctor = `${evento.extendedProps.doctor.nombre} ${evento.extendedProps.doctor.apellido_paterno} ${evento.extendedProps.doctor.apellido_materno}`;
              }
              return (
                <Tr key={evento.id}>
                  <Td>{horario}</Td>
                  <Td>{paciente}</Td>
                  <Td>{doctor}</Td>
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

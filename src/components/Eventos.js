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
  useDisclosure,
  Box,
  FormControl,
} from '@chakra-ui/react';
import AppContext from '../context/AppContext';
import moment from 'moment';
import EventoDrawer from './EventoDrawer';

export default function Eventos() {
  const { eventos } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fecha, setFecha] = useState(moment().format('YYYY-MM-DD'));
  const [eventosPorDia, setEventosPorDia] = useState(null);
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    filterEventosPorFecha();
  }, [eventos, fecha]);

  const filterEventosPorFecha = () => {
    if (eventos) {
      const eventosDia = [];
      console.log(fecha);
      const compareDate = moment(fecha, 'YYYY-MM-DD');
      eventos.map(evento => {
        const eventoStart = moment(evento.start);
        if (eventoStart.isSame(compareDate, 'day')) {
          eventosDia.push(evento);
        }
      });
      setEventosPorDia(eventosDia);
    }
  };

  const handleDate = e => {
    const selectedFecha = moment(e.target.value, 'YYYY-MM-DD')
      .clone()
      .format('YYYY-MM-DD');
    setFecha(selectedFecha);
  };

  const onSelectEvento = evento => {
    setEvento(evento);
    onOpen();
  };

  return (
    <>
      <FormControl>
        <Input type="date" onChange={handleDate} value={fecha} />
      </FormControl>

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
              const nombrePaciente = `${evento.extendedProps.paciente.nombre} ${evento.extendedProps.paciente.apellidos}`;
              let doctor = '- Sin Doctor -';
              if (evento.extendedProps.doctor) {
                doctor = `${evento.extendedProps.doctor.nombre} ${evento.extendedProps.doctor.apellidos}`;
              }
              return (
                <Tr key={evento.id} onClick={() => onSelectEvento(evento)}>
                  <Td>{horario}</Td>
                  <Td>{nombrePaciente}</Td>
                  <Td>{doctor}</Td>
                  <Td>Total</Td>
                  <Td>Pago</Td>
                  <Td>Estado</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <EventoDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={'Cita'}
        evento={evento}
      />
    </>
  );
}

import React, { useContext, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import AppContext from '../context/AppContext';
import { Text, useDisclosure, Flex, SimpleGrid, Box } from '@chakra-ui/react';
import AgendarDrawer from './AgendarDrawer';
import moment from 'moment/min/moment-with-locales';
import '../css/calendar.css';

export default function Agenda() {
  moment.locale('es');
  const { eventos } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  const [fecha, setFecha] = useState(null);

  const calendario = useRef();

  const handleDateClick = arg => {
    if (arg.view.type === 'dayGridMonth') {
      return;
    }

    const evento = {
      start: arg.date,
    };
    setEventoSeleccionado(evento);
    onOpen();
  };

  const handleFecha = fecha => {
    setFecha(fecha);
    let calendarApi = calendario.current.getApi();
    calendarApi.gotoDate(fecha);
    //calendario.current.goToDate(fecha);
  };

  return (
    <>
      <Text>Para agendar una cita seleccione un horario</Text>
      <Flex bgColor="gray.100" justifyContent="space-around">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          dateClick={handleDateClick}
          headerToolbar={{
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: 'timeGridDay,timeGridWeek',
            end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
          }}
          locale={esLocale}
          allDaySlot={false}
          events={eventos}
          slotMinTime="09:00:00"
          slotMaxTime="19:15:00"
          slotDuration="00:15:00"
          ref={calendario}
          eventMouseEnter={e => {
            console.log(e);
          }}
        />

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: false,
            end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
          }}
          locale={esLocale}
          events={eventos}
          navLinks={true}
          dateClick={date => {
            handleFecha(date);
          }}
          navLinkDayClick={date => {
            handleFecha(date);
          }}
        />
      </Flex>

      <AgendarDrawer
        isOpen={isOpen}
        onClose={onClose}
        evento={eventoSeleccionado}
        title={moment(eventoSeleccionado.start).format('LLLL')}
      />
    </>
  );
}

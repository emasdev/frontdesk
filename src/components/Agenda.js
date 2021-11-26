import React, { useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import AppContext from '../context/AppContext';
import AgendarAhoraBtn from './AgendarAhoraBtn';
import { Text, useDisclosure } from '@chakra-ui/react';
import AgendaDrawer from './AgendaDrawer';

export default function Agenda() {
  const { eventos } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});

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

  return (
    <>
      <AgendarAhoraBtn />
      <Text>Para agendar una cita seleccione un horario</Text>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        dateClick={handleDateClick}
        headerToolbar={{
          start: 'title', // will normally be on the left. if RTL, will be on the right
          center: 'timeGridDay,timeGridWeek,dayGridMonth',
          end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
        }}
        locale={esLocale}
        allDaySlot={false}
        events={eventos}
        slotMinTime="09:00:00"
        slotMaxTime="19:00:00"
        slotDuration="00:15:00"
      />
      <AgendaDrawer
        isOpen={isOpen}
        onClose={onClose}
        evento={eventoSeleccionado}
      />
    </>
  );
}

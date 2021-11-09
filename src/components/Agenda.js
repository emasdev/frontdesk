import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

export default function Agenda() {
  const handleDateClick = arg => {
    // bind with an arrow function
    alert(`Agregar cita para el ${arg.dateStr}`);
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      headerToolbar={{
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: 'timeGridDay,timeGridWeek,dayGridMonth',
        end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
      }}
      locale={esLocale}
      allDaySlot={false}
    />
  );
}

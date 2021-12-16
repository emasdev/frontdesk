import React, { useContext, useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import {
  Text,
  useDisclosure,
  Flex,
  SimpleGrid,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import AgendarDrawer from './AgendarDrawer';
import moment from 'moment/min/moment-with-locales';
import '../css/calendar.css';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { doc } from 'firebase/firestore';

export default function Agenda() {
  moment.locale('es');
  const { eventos, evento, setEvento, loadEventos } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  const [eventoReagendar, setEventoReagendar] = useState(null);
  const [fecha, setFecha] = useState(null);

  const calendario = useRef();

  useEffect(() => {
    console.log('evento');
    console.log(evento);
    if (evento) {
      setEventoReagendar(evento);
    } else {
      setEventoReagendar(null);
    }
  }, [evento]);

  const handleDateClick = async arg => {
    if (arg.view.type === 'dayGridMonth') {
      return;
    }

    if (eventoReagendar) {
      if (moment(arg.date).isBefore(moment().format())) {
        alert('Elegir una fecha y horario valido');
      } else {
        const docData = { ...eventoReagendar };
        docData.start = moment(arg.date).format();
        docData.end = moment(arg.date)
          .add(eventoReagendar.extendedProps.duracion, 'minutes')
          .format();

        await db.updateDocument('eventos', eventoReagendar.id, docData);
        setEventoReagendar(null);
        setEvento(null);
        loadEventos();
      }
    } else {
      const evento = {
        start: arg.date,
      };
      setEventoSeleccionado(evento);
      onOpen();
    }
  };

  const handleFecha = fecha => {
    setFecha(fecha);
    let calendarApi = calendario.current.getApi();
    calendarApi.gotoDate(fecha);
    //calendario.current.goToDate(fecha);
  };

  const BoxInfo = () => {
    //console.log(paciente);
    return (
      <Box border="2px" borderColor="gray.400" borderRadius={5} p={3}>
        <SimpleGrid columns={2} spacing={3}>
          <Text>Paciente:</Text>
          <Text>
            {eventoReagendar.extendedProps.paciente.nombre}{' '}
            {eventoReagendar.extendedProps.paciente.apellidos}
          </Text>

          <Text>Estudios:</Text>
          <UnorderedList>
            {eventoReagendar.extendedProps.estudios.map((estudio, index) => {
              return <ListItem key={index}>{estudio.nombre}</ListItem>;
            })}
          </UnorderedList>

          <Text>Duracion:</Text>
          <Text>{eventoReagendar.extendedProps.duracion} minutos</Text>

          <Text>Fecha:</Text>
          <Text>{moment(eventoReagendar.start).format('LLLL')}</Text>

          <Text>Doctor:</Text>
          <Text>
            {eventoReagendar.extendedProps.doctor
              ? `${eventoReagendar.extendedProps.doctor.nombre} ${eventoReagendar.extendedProps.doctor.apellidos}`
              : `-- Sin Doctor --`}
          </Text>
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <>
      <Box>
        {eventoReagendar ? (
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Seleccionar día y hora para reagendar la cita seleccionada
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {console.log(eventoReagendar)}
              <BoxInfo />
              <Button mt={2} onClick={() => setEventoReagendar(null)}>
                Cancelar
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Text>Para agendar una cita seleccione un horario</Text>
        )}
      </Box>

      <Flex bgColor="gray.100" justifyContent="space-around" h="100%">
        <Box w="100%">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            dateClick={handleDateClick}
            headerToolbar={{
              start: 'title', // will normally be on the left. if RTL, will be on the right
              center: 'today',
              end: 'prev,next', // will normally be on the right. if RTL, will be on the left
            }}
            locale={esLocale}
            allDaySlot={false}
            events={eventos}
            slotMinTime="09:00:00"
            slotMaxTime="19:15:00"
            slotDuration="00:15:00"
            slotLabelInterval="00:15:00"
            ref={calendario}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              omitZeroMinute: false,
            }}
          />
        </Box>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'title', // will normally be on the left. if RTL, will be on the right
            center: false,
            end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
          }}
          locale={esLocale}
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

import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect } from 'react';
import moment from 'moment/min/moment-with-locales';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  RadioGroup,
  Text,
  Flex,
  Switch,
  Box,
  VStack,
  SimpleGrid,
  UnorderedList,
  ListItem,
  ButtonGroup,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Select from 'react-select';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import NavContext from '../context/NavContext';
import AgregarDoctorBtn from './AgregarDoctorBtn';

export default function EventoDrawer({
  isOpen,
  onClose,
  onOpen,
  evento,
  title,
}) {
  const { usuarios, loadEventos, catalogo, setEvento } = useContext(AppContext);
  const { setSection } = useContext(NavContext);
  moment.locale('es');
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [paciente, setPaciente] = useState();
  const [duracion, setDuracion] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [isAlertaBorrar, setIsAlertaBorrar] = useState(false);

  //const [selectedDoctor, setSelectedDoctor] = useState(null);
  //const [selectedEstudios, setSelectedEstudios] = useState(null);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setPaciente(`${value.nombre} ${value.apellidos}`);
      setDuracion(value.duracion);
      //console.log(paciente);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (evento) {
      setPaciente(evento.extendedProps.paciente);
      setSelectEstudios(evento.extendedProps.estudios);
      setDuracion(evento.extendedProps.duracion);
      setFecha(moment(evento.start).format());
      setDoctor(evento.extendedProps.doctor);
      setIsAlertaBorrar(false);
      //setSelectedDoctor(getSelectedDoctor());
      //setSelectedEstudios(getSelectedEstudios());

      //console.log(es);
      //setSelectedEstudios(es);
      //console.log(estudiosOptions);
      // setSelectedEstudios(getSelectedEstudios());
      //setDuracion(moment(evento.start).diff(moment(evento.end), 'minutes'));
      setValue('nombre', evento.extendedProps.paciente.nombre);
      setValue('apellidos', evento.extendedProps.paciente.apellidos);
      setValue('duracion', evento.extendedProps.paciente.duracion);
    }
  }, [evento]);

  const [isSelectDoctorDisabled, setIsSelectDoctorDisabled] = useState(false);
  const [selectEstudios, setSelectEstudios] = useState(null);
  const [fecha, setFecha] = useState(moment().format());

  const [doctorOptions, setDoctorOptions] = useState(null);
  const [estudiosOptions, setEstudiosOptions] = useState(null);

  useEffect(() => {
    if (!usuarios) return;
    setDoctorOptions(
      usuarios.map(usuario => {
        return {
          value: JSON.stringify(usuario),
          label: `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`,
        };
      })
    );

    setEstudiosOptions(
      catalogo.estudios.map(estudio => {
        return {
          value: JSON.stringify(estudio),
          label: `${estudio.nombre}`,
        };
      })
    );
  }, [usuarios, catalogo]);

  //console.log(errors);

  // const [duracionCita, setDuracionCita] = useState();

  const onSubmit = async values => {
    alert(values);
    onClose();
  };

  const handleCancelarCita = async () => {
    await db.deleteDocument('eventos', evento.id);
    loadEventos();
    onClose();
  };

  const handleReagendarCita = () => {
    setEvento(evento);
    setSection('Agenda');
  };

  const handleIsSinDoctor = e => {
    setIsSelectDoctorDisabled(e.target.checked);
  };

  const handleSelectDoctor = e => {
    e ? setDoctor(JSON.parse(e.value)) : setDoctor(null);
  };

  const handleSelectEstudios = e => {
    const estudios = [];
    e.map(estudio => {
      estudios.push(JSON.parse(estudio.value));
    });

    setSelectEstudios(estudios);
  };

  const BoxInfo = () => {
    //console.log(paciente);
    return (
      <Box border="2px" borderColor="gray.400" borderRadius={5} p={3}>
        <SimpleGrid columns={2} spacing={3}>
          {paciente && (
            <>
              <Text>Paciente:</Text>
              <Text>{paciente}</Text>
            </>
          )}
          {selectEstudios && (
            <>
              <Text>Estudios:</Text>
              <UnorderedList>
                {selectEstudios &&
                  selectEstudios.map((estudio, index) => {
                    return <ListItem key={index}>{estudio.nombre}</ListItem>;
                  })}
              </UnorderedList>
            </>
          )}
          {duracion && (
            <>
              <Text>Duracion:</Text>
              <Text>{duracion} minutos</Text>
            </>
          )}
          {fecha && (
            <>
              <Text>Fecha:</Text>
              <Text>{moment(fecha).format('LLLL')}</Text>
            </>
          )}

          {doctor && (
            <>
              <Text>Doctor:</Text>
              <Text>
                {!isSelectDoctorDisabled
                  ? `${doctor.nombre} ${doctor.apellidos}`
                  : `-- Sin Doctor --`}
              </Text>
            </>
          )}
        </SimpleGrid>
      </Box>
    );
  };

  const getSelectedDoctor = () => {
    const doctor = doctorOptions.find(
      d => JSON.parse(d.value).id === evento.extendedProps.doctor.id
    );

    return doctor;
  };

  const getSelectedEstudios = () => {
    // const estudios = estudiosOptions.map(e => {
    //   const value = JSON.parse(e.value);
    //   console.log(value);
    //   return value;
    // });
    // return estudios;
  };

  // const getSelectedEstudios = () => {
  //   const estudios = estudiosOptions.map(e => {const value = JSON.parse(e.value)});
  //   console.log(estudios);
  //   return estudios;
  // };

  const SelectDuracion = ({ text }) => {
    const isChecked = inputValue => {
      return evento.extendedProps.duracion == inputValue;
    };
    return (
      <Flex justifyContent="space-between">
        <FormLabel>{text}</FormLabel>
        {console.log()}
        <RadioGroup>
          <Stack direction="row" spacing={4}>
            <Flex alignItems="center">
              <input
                {...register('duracion', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="15"
                checked={isChecked('15')}
              />
              <Text ml={1}>15m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="30"
                checked={isChecked('30')}
              />
              <Text ml={1}>30m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="45"
                checked={isChecked('45')}
              />
              <Text ml={1}>45m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="60"
                checked={isChecked('60')}
              />
              <Text ml={1}>60m</Text>
            </Flex>
          </Stack>
        </RadioGroup>
      </Flex>
    );
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                <BoxInfo />
                {!isAlertaBorrar ? (
                  <Flex justifyContent="space-between">
                    <Button onClick={() => setIsAlertaBorrar(true)}>
                      Cancelar cita
                    </Button>
                    <Button onClick={handleReagendarCita}>
                      Reagendar cita
                    </Button>
                  </Flex>
                ) : (
                  <Flex justifyContent="space-between" direction={'column'}>
                    <Alert status="error">
                      <AlertIcon />
                      ¿Estas seguro de querer cancelar la cita? Esta acción es
                      irreversible
                    </Alert>
                    <Button
                      colorScheme={'red'}
                      onClick={handleCancelarCita}
                      mt={2}
                    >
                      Cancelar cita
                    </Button>
                  </Flex>
                )}
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <ButtonGroup>
                <Button colorScheme={'teal'}>Llegó paciente</Button>
              </ButtonGroup>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

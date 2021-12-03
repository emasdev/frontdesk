import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect, useRef } from 'react';
import moment from 'moment/min/moment-with-locales';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
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
} from '@chakra-ui/react';
import Select from 'react-select';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import AgregarDoctorBtn from './AgregarDoctorBtn';

export default function AgendarBtn({ isNow = false, children }) {
  moment.locale('es');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usuarios, loadEventos, catalogo } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isSelectDoctorDisabled, setIsSelectDoctorDisabled] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [selectEstudios, setSelectEstudios] = useState(null);
  const [duracion, setDuracion] = useState(null);
  const [isHorarioActual, setIsHorarioActual] = useState(true);
  const [isHorarioSet, setIsHorarioSet] = useState(false);
  const [horario, setHorario] = useState(null);
  const [selectHorario, setSelectHorario] = useState({
    horas: null,
    minutos: null,
    fecha: null,
  });

  const [doctorOptions, setDoctorOptions] = useState(null);
  const [estudiosOptions, setEstudiosOptions] = useState(null);
  const watchDuracionCita = watch('duracion_cita', null);
  const watchNombrePaciente = watch('nombre', null);
  const watchApellidosPaciente = watch('apellidos', null);

  const handleDuracion = e => {
    console.log(e);
  };

  const handleIsHorarioActual = e => {
    setIsHorarioActual(e.target.checked);
  };

  useEffect(() => {
    if (isHorarioActual) {
      setIsHorarioSet(false);
      setHorario(moment().format());
    } else {
      console.log(selectHorario);
      const { horas, minutos, fecha } = selectHorario;

      if (horas && minutos && fecha) {
        const horario = `${horas}:${minutos} ${fecha}`;
        setHorario(moment(horario, 'HH:mm YYYY-MM-DD').format());
        setIsHorarioSet(true);
      }
    }
    console.log('select horario change');
  }, [selectHorario, isHorarioActual]);

  const handleFecha = e => {
    e
      ? setSelectHorario({ ...selectHorario, fecha: e.target.value })
      : setSelectHorario({ ...selectHorario, fecha: null });
  };

  const handleHoras = e => {
    e
      ? setSelectHorario({ ...selectHorario, horas: e.value })
      : setSelectHorario({ ...selectHorario, horas: null });
  };

  const handleMinutos = e => {
    e
      ? setSelectHorario({ ...selectHorario, minutos: e.value })
      : setSelectHorario({ ...selectHorario, minutos: null });
  };

  const horasOptions = Array(9)
    .fill(0)
    .map((e, i) => {
      const value = i + 9;
      const label = i + 9;
      return { value, label };
    });

  const minutosOptions = Array(4)
    .fill(0)
    .map((e, i) => {
      const value = i * 15;
      const label = i * 15;
      return { value, label };
    });

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
    let isValid = true;
    if (!selectDoctor && !isSelectDoctorDisabled) {
      setError('doctor', {
        type: 'manual',
        message: FormErrorMessage.requerido,
      });
      isValid = false;
    }

    if (!selectEstudios) {
      setError('estudios', {
        type: 'manual',
        message: FormErrorMessage.requerido,
      });
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const doctor = !isSelectDoctorDisabled ? selectDoctor : null;

    const docData = {
      title: values.nombre + ' ' + values.apellidos,
      start: moment(horario).format(),
      end: moment(horario)
        .add(parseInt(values.duracion_cita), 'minutes')
        .format(),
      extendedProps: {
        nombre: values.nombre,
        apellidos: values.apellidos,
        doctor: doctor,
        estudios: selectEstudios,
      },
    };
    const doc = await db.createDocument('eventos', docData);
    loadEventos();
    onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    setFocus('nombre');
  };

  const handleIsSinDoctor = e => {
    setIsSelectDoctorDisabled(e.target.checked);
  };

  const handleSelectDoctor = e => {
    e ? setSelectDoctor(JSON.parse(e.value)) : setSelectDoctor(null);
  };

  const handleSelectEstudios = e => {
    const estudios = [];
    e.map(estudio => {
      estudios.push(JSON.parse(estudio.value));
    });

    setSelectEstudios(estudios);
  };

  const SelectDuracion = ({ text }) => {
    return (
      <SimpleGrid columns={2}>
        <FormLabel>{text}</FormLabel>
        <RadioGroup>
          <Stack direction="row" spacing={4}>
            <Flex alignItems="center">
              <input
                {...register('duracion_cita', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="0"
              />
              <Text ml={1}>0m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion_cita', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="15"
              />
              <Text ml={1}>15m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion_cita', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="30"
              />
              <Text ml={1}>30m</Text>
            </Flex>
            <Flex alignItems="center">
              <input
                {...register('duracion_cita', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="45"
              />
              <Text ml={1}>45m</Text>
            </Flex>
          </Stack>
        </RadioGroup>
      </SimpleGrid>
    );
  };

  return (
    <>
      <Button onClick={handleOpen}>{children}</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{children}</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.nombre}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre de paciente"
                    {...register('nombre', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.apellidos}>
                  <FormLabel>Apellidos</FormLabel>
                  <Input
                    placeholder="Apellidos"
                    {...register('apellidos', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.apellidos && errors.apellidos.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.duracion_cita}>
                  <FormLabel>Seleccionar Fecha</FormLabel>

                  <VStack>
                    <Box
                      border="1px"
                      textAlign="center"
                      borderColor="gray.400"
                      borderRadius="md"
                      p={2}
                      m={2}
                    >
                      {isHorarioActual ? (
                        <>
                          <Text>{moment(horario).format('LL')}</Text>
                          <Text>{moment(horario).format('HH:mm')}</Text>
                        </>
                      ) : (
                        <>
                          {isHorarioSet ? (
                            <>
                              <Text>{moment(horario).format('LL')}</Text>
                              <Text>{moment(horario).format('HH:mm')}</Text>
                            </>
                          ) : (
                            <Text>Seleccionar Horario</Text>
                          )}
                        </>
                      )}
                    </Box>
                  </VStack>

                  <Stack direction="column">
                    <Box textAlign="center">
                      <Switch
                        onChange={handleIsHorarioActual}
                        isChecked={isHorarioActual}
                      >
                        Seleccionar hora y fecha actual
                      </Switch>
                    </Box>

                    {console.log(selectHorario.horas)}

                    {!isHorarioActual && (
                      <SimpleGrid columns={2}>
                        <FormLabel>Fecha:</FormLabel>
                        <Input
                          type="date"
                          onChange={handleFecha}
                          value={selectHorario.fecha}
                        />
                        <FormLabel>Hora:</FormLabel>
                        <Select
                          options={horasOptions}
                          isSearchable={true}
                          placeholder="Seleccionar hora"
                          onChange={handleHoras}
                        />
                        <FormLabel>Minuto:</FormLabel>
                        <Select
                          options={minutosOptions}
                          isSearchable={true}
                          placeholder="Seleccionar minutos"
                          onChange={handleMinutos}
                        />
                      </SimpleGrid>
                    )}

                    <SelectDuracion text={'Duración'} />
                  </Stack>

                  <FormErrorMessage>
                    {errors.duracion_cita && errors.duracion_cita.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.doctor}>
                  <FormLabel>Seleccionar Doctor</FormLabel>
                  <Select
                    options={doctorOptions}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Seleccionar Doctor"
                    isDisabled={isSelectDoctorDisabled}
                    onChange={handleSelectDoctor}
                  />

                  <Flex mt={2}>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Sin Doctor</FormLabel>
                      <Switch onChange={handleIsSinDoctor} />
                    </FormControl>
                    <AgregarDoctorBtn />
                  </Flex>
                  <FormErrorMessage>
                    {errors.doctor && errors.doctor.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.estudios}>
                  <FormLabel>Seleccionar Estudios</FormLabel>
                  <Select
                    options={estudiosOptions}
                    isMulti
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Seleccionar Estudio"
                    onChange={handleSelectEstudios}
                  />
                  <FormErrorMessage>
                    {errors.estudios && errors.estudios.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                mt={8}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Agendar ahora
              </Button>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

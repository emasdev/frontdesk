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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Select from 'react-select';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import AgregarDoctorBtn from './AgregarDoctorBtn';

export default function AgendarDrawer({
  isOpen,
  onClose,
  onOpen,
  evento,
  title,
  displayFechaNacimiento = false,
}) {
  const { usuarios, loadEventos, catalogo } = useContext(AppContext);
  moment.locale('es');
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [paciente, setPaciente] = useState(null);
  const [duracion, setDuracion] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setPaciente({
        nombre: value.nombre,
        apellidos: value.apellidos,
        fecha_nacimiento: displayFechaNacimiento
          ? value.fecha_nacimiento
          : null,
      });
      setDuracion(value.duracion_cita);
      console.log(paciente);
      console.log(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const [isSelectDoctorDisabled, setIsSelectDoctorDisabled] = useState(false);
  const [selectEstudios, setSelectEstudios] = useState(null);
  const [fecha, setFecha] = useState(moment().format());
  const firstField = useRef();

  const [doctorOptions, setDoctorOptions] = useState(null);
  const [estudiosOptions, setEstudiosOptions] = useState(null);
  const [isFechaValida, setIsFechaValida] = useState(null);

  useEffect(() => {
    if (evento) {
      const _fecha = moment(evento.start).format();
      const isBefore = moment(_fecha).isBefore(moment());
      setIsFechaValida(!isBefore);
    } else {
      setIsFechaValida(true);
    }
  }, [evento]);

  useEffect(() => {
    //reset
    if (isOpen) {
      setValue('nombre', '');
      setValue('apellidos', '');
      //setFocus('nombre');
      if (displayFechaNacimiento) setValue('fecha_nacimiento', '');
      setDoctor(null);
      setSelectEstudios(null);
      setDuracion(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!usuarios) return;
    setDoctorOptions(
      usuarios.map(usuario => {
        return {
          value: JSON.stringify(usuario),
          label: `${usuario.nombre} ${usuario.apellidos}`,
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

  const onSubmit = async values => {
    // let paciente = {
    //   nombre: values.nombre,
    //   apellidos: values.apellidos,
    //   fecha_nacimiento: displayFechaNacimiento ? values.fecha_nacimiento : null,
    // };
    const docData = {
      title: paciente,
      start: fecha,
      end: moment(fecha).add(duracion, 'minutes').format(),
      extendedProps: {
        paciente: paciente,
        doctor: doctor,
        estudios: selectEstudios,
        duracion: duracion,
      },
    };
    const doc = await db.createDocument('eventos', docData);
    loadEventos();
    onClose();
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
              <Box>
                <Text>
                  {paciente.nombre} {paciente.apellidos}
                </Text>
                {displayFechaNacimiento && (
                  <Text>{paciente.fecha_nacimiento}</Text>
                )}
              </Box>
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

          {doctor && (
            <>
              <Text>Doctor:</Text>
              {console.log(doctor)}
              <Text>
                {!isSelectDoctorDisabled
                  ? `${doctor.nombre} ${doctor.apellidos}`
                  : `-- Sin Doctor --`}
              </Text>
            </>
          )}
          {fecha && (
            <>
              <Text>Fecha:</Text>
              <Text>{moment(fecha).format('LLLL')}</Text>
            </>
          )}
        </SimpleGrid>
      </Box>
    );
  };

  const SelectDuracion = ({ text }) => {
    return (
      <Flex justifyContent="space-between">
        <FormLabel>{text}</FormLabel>
        <RadioGroup>
          <Stack direction="row" spacing={4}>
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
            <Flex alignItems="center">
              <input
                {...register('duracion_cita', {
                  required: FormValidationTexts.requerido,
                })}
                type="radio"
                value="60"
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={'md'}
        //initialFocusRef={firstField}
      >
        <DrawerOverlay />
        {isFechaValida ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
              <DrawerBody>
                <Stack spacing="24px">
                  <FormControl isInvalid={errors.nombre}>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      placeholder="Nombre de paciente"
                      {...register('nombre', {
                        required: FormValidationTexts.requerido,
                      })}
                      //ref={firstField}
                    />
                    <FormErrorMessage>
                      {errors.nombre && errors.nombre.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.apellidos}>
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      placeholder="Apellidos de paciente"
                      {...register('apellidos', {
                        required: FormValidationTexts.requerido,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.apellidos && errors.apellidos.message}
                    </FormErrorMessage>
                  </FormControl>

                  {displayFechaNacimiento && (
                    <FormControl isInvalid={errors.fecha_nacimiento}>
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <Input
                        type="date"
                        {...register('fecha_nacimiento', {
                          required: FormValidationTexts.requerido,
                        })}
                      />
                      <FormErrorMessage>
                        {errors.fecha_nacimiento &&
                          errors.fecha_nacimiento.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}

                  {displayFechaNacimiento && (
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
                  )}

                  <FormControl>
                    <SelectDuracion text={'Duracion de cita'} />
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
                  <BoxInfo />
                </Stack>
              </DrawerBody>
              <DrawerFooter borderTopWidth="1px">
                <Button
                  mt={8}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Agendar
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        ) : (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
            <DrawerBody>
              <Alert status="error">
                <AlertIcon />
                Este horario no es valido.
              </Alert>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px"></DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
}

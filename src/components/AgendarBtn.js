import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect, useRef } from 'react';
import moment from 'moment';

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
} from '@chakra-ui/react';
import Select from 'react-select';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import AgregarDoctorBtn from './AgregarDoctorBtn';

export default function RegistrarPacienteBtn({ isNow = false, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usuarios, loadEventos, catalogo } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isSelectDoctorDisabled, setIsSelectDoctorDisabled] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [selectEstudios, setSelectEstudios] = useState(null);
  const [isHorarioSelectable, setIsHorarioSelectable] = useState(true);
  const [horarioActual, setHorarioActual] = useState(moment().format('h:mm'));
  const [selectHorario, setSelectHorario] = useState({
    horas: null,
    minutos: null,
  });
  const [hh, sethh] = useState(null);

  const [doctorOptions, setDoctorOptions] = useState(null);
  const [estudiosOptions, setEstudiosOptions] = useState(null);

  const handleIsHorarioSelectable = e => {
    setIsHorarioSelectable(e.target.checked);
  };

  const handleHoras = e => {
    setSelectHorario({ ...selectHorario, horas: e.value });
  };

  const handleMinutos = e => {
    setSelectHorario({ ...selectHorario, minutos: e.value });
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
      start: moment().format(),
      end: moment().add(parseInt(values.duracion_cita), 'minutes').format(),
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
      <Stack>
        <Text>{text}</Text>
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
      </Stack>
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
                  <FormLabel>Horario</FormLabel>
                  <Flex
                    justifyContent="space-between"
                    justifyItems="center"
                    alignItems="center"
                  >
                    {isHorarioSelectable ? (
                      <Text>horario</Text>
                    ) : (
                      <VStack>
                        <Text>
                          {selectHorario.horas} : {selectHorario.minutos}
                        </Text>
                        <Select
                          options={horasOptions}
                          isSearchable={true}
                          placeholder="Seleccionar hora"
                          onChange={handleHoras}
                        />
                        <Select
                          options={minutosOptions}
                          isSearchable={true}
                          placeholder="Seleccionar minutos"
                          onChange={handleMinutos}
                        />
                      </VStack>
                    )}
                    <Stack direction="column">
                      <Switch
                        onChange={handleIsHorarioSelectable}
                        isChecked={isHorarioSelectable}
                      >
                        Seleccionar hora actual
                      </Switch>
                      <SelectDuracion text={'Duración'} />
                    </Stack>
                  </Flex>

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

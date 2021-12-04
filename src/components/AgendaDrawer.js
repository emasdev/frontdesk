import React, { useContext, useState } from 'react';
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
  Radio,
  Text,
  Flex,
  Switch,
} from '@chakra-ui/react';
import moment from 'moment/min/moment-with-locales';
import { useForm } from 'react-hook-form';
import AgregarDoctorBtn from './AgregarDoctorBtn';
import FormValidationTexts from '../helpers/FormValidationTexts';
import AppContext from '../context/AppContext';
import db from '../helpers/FirestoreService';
import Select from 'react-select';
import AgendaMenu from './AgendaMenu';

export default function AgendaDrawer({ isOpen, onClose, evento }) {
  moment.locale('es');
  const { usuarios, loadEventos, catalogo } = useContext(AppContext);
  const [isSelectDoctorDisabled, setIsSelectDoctorDisabled] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [selectEstudios, setSelectEstudios] = useState(null);
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

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
      start: moment(evento.start).format(),
      end: moment(evento.start)
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

  const doctorOptions = usuarios.map(usuario => {
    return {
      value: JSON.stringify(usuario),
      label: `${usuario.nombre} ${usuario.apellidos}`,
    };
  });

  const estudioOptions = catalogo.estudios.map(estudio => {
    return {
      value: JSON.stringify(estudio),
      label: `${estudio.nombre}`,
    };
  });
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
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Agendar cita</DrawerHeader>

        <DrawerBody>
          <Flex>
            {console.log(evento.start)}
            <Text>Para el {moment(evento.start).format('LLL')}</Text>
          </Flex>
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
                <FormLabel>Duracion Cita</FormLabel>
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
                  options={estudioOptions}
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
              Agendar
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
  );
}

import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
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
  Box,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  Select,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
  Text,
  Flex,
  Switch,
} from '@chakra-ui/react';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
import AgregarDoctorBtn from './AgregarDoctorBtn';
import AgendaMenu from './AgendaMenu';
import AgendaSteps from './AgendaSteps';

export default function NuevoPacienteBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usuarios, loadEventos } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors);

  // const [duracionCita, setDuracionCita] = useState();

  const onSubmit = async values => {
    const docData = {
      title: values.nombre + ' ' + values.apellidos,
      start: moment().format(),
      end: moment().add(parseInt(values.duracion_cita), 'minutes').format(),
      extendedProps: {
        nombre: values.nombre,
        apellidos: values.apellidos,
        doctor: JSON.parse(values.doctor),
      },
    };
    const doc = await db.createDocument('eventos', docData);
    loadEventos();
    // onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    //setFocus('nombre');
  };

  return (
    <>
      <Button onClick={handleOpen}>Agendar Paciente</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Nuevo Paciente</DrawerHeader>

          <DrawerBody>
            <AgendaSteps isDone={onClose} />
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

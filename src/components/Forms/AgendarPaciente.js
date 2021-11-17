import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
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
  Select,
} from '@chakra-ui/react';
import FormValidationTexts from '../../helpers/FormValidationTexts';
import AgendaContext from '../../context/AgendaContext';

export default function AgendarPaciente() {
  const { nextStep, prevStep, activeStep, setPaciente } =
    useContext(AgendaContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    console.log(values);
    const paciente = {
      nombre: values.nombre,
      apellidos: values.apellidos,
    };

    setPaciente(paciente);
    nextStep();
  };
  return (
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
            placeholder="Apellidos de paciente"
            {...register('apellidos', {
              required: FormValidationTexts.requerido,
            })}
          />
          <FormErrorMessage>
            {errors.apellidos && errors.apellidos.message}
          </FormErrorMessage>
        </FormControl>
        <Flex width="100%" justifyContent="center">
          <Button
            mr={4}
            size="sm"
            variant="ghost"
            onClick={prevStep}
            isDisabled={activeStep === 0}
          >
            Anterior
          </Button>
          <Button size="sm" type="submit">
            Siguiente
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}

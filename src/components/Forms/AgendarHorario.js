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
import moment from 'moment';

export default function AgendarHorario() {
  const { nextStep, prevStep, activeStep, setHorario } =
    useContext(AgendaContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    console.log(values);
    const horario = {
      start: moment().format(),
      end: moment().add(parseInt(values.duracion_cita), 'minutes').format(),
    };

    setHorario(horario);
    nextStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="24px">
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

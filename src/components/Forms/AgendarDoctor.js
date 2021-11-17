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
import AppContext from '../../context/AppContext';
import AgregarDoctorBtn from '../AgregarDoctorBtn';

export default function AgendarDoctor() {
  const { nextStep, prevStep, activeStep, setPaciente, setDoctor } =
    useContext(AgendaContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const { usuarios } = useContext(AppContext);

  const onSubmit = async values => {
    const doctor = JSON.parse(values.doctor);
    setDoctor(doctor);
    nextStep();
  };

  const handlePrevStep = () => {
    setPaciente(null);
    prevStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="24px">
        <FormControl isInvalid={errors.doctor}>
          <FormLabel>Seleccionar Doctor</FormLabel>
          <Select
            placeholder="Seleccionar Doctor"
            {...register('doctor', {
              required: FormValidationTexts.requerido,
            })}
          >
            <option>-- Sin Doctor --</option>
            {usuarios &&
              usuarios.map(usuario => {
                const value = JSON.stringify(usuario);
                return (
                  <option value={value} key={usuario.id}>
                    {usuario.nombre} {usuario.apellido_paterno}{' '}
                    {usuario.apellido_materno}
                  </option>
                );
              })}
          </Select>
          <Flex>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">¿No tiene doctor?</FormLabel>
              <Switch />
            </FormControl>
            <AgregarDoctorBtn />
          </Flex>

          <FormErrorMessage>
            {errors.doctor && errors.doctor.message}
          </FormErrorMessage>
        </FormControl>
        <Flex width="100%" justifyContent="center">
          <Button
            mr={4}
            size="sm"
            variant="ghost"
            onClick={handlePrevStep}
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

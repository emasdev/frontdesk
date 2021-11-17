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
  CheckboxGroup,
  HStack,
  Checkbox,
} from '@chakra-ui/react';
import FormValidationTexts from '../../helpers/FormValidationTexts';
import AgendaContext from '../../context/AgendaContext';

export default function AgendarEstudios() {
  const { nextStep, prevStep, activeStep, setDoctor, setEstudios } =
    useContext(AgendaContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    console.log(values);

    const estudios = {
      titulo: 'estudio 1',
      titulo: 'estudio 2',
    };
    setEstudios(estudios);
    nextStep();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="24px">
        <FormControl isInvalid={errors.estudios}>
          <CheckboxGroup>
            <HStack>
              <Checkbox value="Estudio1">Estudio1</Checkbox>
              <Checkbox value="Estudio2">Estudio2</Checkbox>
              <Checkbox value="Estudio3">Estudio3</Checkbox>
              <Checkbox value="Estudio4">Estudio4</Checkbox>
            </HStack>
          </CheckboxGroup>

          <FormErrorMessage>
            {errors.estudios && errors.estudios.message}
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

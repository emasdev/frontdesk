import { useForm } from 'react-hook-form';
import { useRef } from 'react';

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
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  Select,
  Textarea,
} from '@chakra-ui/react';
import FormValidationTexts from '../helpers/FormValidationTexts';

export default function AgregarDoctorBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }

  async function handleOpen() {
    await onOpen();
    setFocus('nombre');
  }

  return (
    <>
      <Button onClick={handleOpen}>Agregar Doctor</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Agendar Nuevo Doctor
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.nombre}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre de doctor"
                    {...register('nombre', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.name}>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <Input
                    placeholder="Apellido Paterno"
                    {...register('apellido_paterno')}
                  />
                </FormControl>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Apellido Materno</FormLabel>
                  <Input
                    placeholder="Apellido Materno"
                    {...register('apellido_materno')}
                  />
                </FormControl>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    placeholder="Teléfono a 10 digitos"
                    {...register('tel')}
                  />
                </FormControl>
              </Stack>
              <Button
                mt={8}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Agregar
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

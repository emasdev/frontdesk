import { useForm } from 'react-hook-form';
import { useContext } from 'react';

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
  Flex,
} from '@chakra-ui/react';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';

export default function EditarDoctorDrawer({
  doctor,
  isOpen,
  onOpen,
  onClose,
}) {
  const { loadUsuarios } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    const docData = {
      nombre: values.nombre,
      apellido_paterno: values.apellido_paterno,
      apellido_materno: values.apellido_materno,
      tel: values.tel,
    };
    const doc = await db.createDocument('usuarios', docData);
    loadUsuarios();
    onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    setFocus('nombre');
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Editar Doctor</DrawerHeader>

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

                <FormControl isInvalid={errors.apellido_paterno}>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <Input
                    placeholder="Apellido Paterno"
                    {...register('apellido_paterno', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.apellido_paterno && errors.apellido_paterno.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.apellido_materno}>
                  <FormLabel>Apellido Materno</FormLabel>
                  <Input
                    placeholder="Apellido Materno"
                    {...register('apellido_materno')}
                  />
                  <FormErrorMessage>
                    {errors.apellido_materno && errors.apellido_materno.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.tel}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    placeholder="Teléfono a 10 digitos"
                    {...register('tel', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormHelperText>
                    De preferencia usar un numero que cuente con WhatsApp.
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.tel && errors.tel.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Flex>
                <Button
                  mt={8}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Editar
                </Button>
                <Button
                  mt={8}
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Borrar
                </Button>
              </Flex>
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

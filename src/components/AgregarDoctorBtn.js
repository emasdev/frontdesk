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
} from '@chakra-ui/react';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';

export default function AgregarDoctorBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      apellidos: values.apellidos,
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
      <Button onClick={handleOpen}>Agregar Doctor</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Agregar nuevo Doctor
          </DrawerHeader>

          <DrawerBody>

              <Stack spacing="24px">
                <FormControl isInvalid={errors.nombre}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre de Doctor"
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
                    placeholder="Apellidos de Doctor"
                    {...register('apellidos', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.apellidos && errors.apellidos.message}
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

         
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
          <Button
                mt={8}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Agregar
              </Button>
          </DrawerFooter>
        </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

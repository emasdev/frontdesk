import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';

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
  const { loadUsuarios, catalogo } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    const docData = {
      nombre: values.nombre,
      apellidos: values.apellidos,
      tel: values.tel,
      lista_precios: values.lista_precios,
    };
    const doc = await db.updateDocument('usuarios', doctor.id, docData);
    loadUsuarios();
    onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    setFocus('nombre');
  };

  useEffect(() => {
    if (doctor) {
      setValue('nombre', doctor.nombre);
      setValue('apellidos', doctor.apellidos);
      setValue('tel', doctor.tel);
      setValue('lista_precios', doctor.lista_precios);
    }
  }, [doctor]);

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Editar Doctor</DrawerHeader>

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
                  <FormLabel>Tel??fono</FormLabel>
                  <Input
                    placeholder="Tel??fono a 10 digitos"
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
                <FormControl>
                  <Select
                    placeholder="Seleccionar lista de precios"
                    {...register('lista_precios', {
                      required: FormValidationTexts.requerido,
                    })}
                  >
                    {catalogo.listas_precios &&
                      catalogo.listas_precios.map(lista => {
                        return (
                          <option key={lista.id} value={lista.id}>
                            {lista.titulo}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Flex>
                <Button
                  mt={8}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Editar
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}

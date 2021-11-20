import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

export default function AgregarDoctorBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { catalogo, setCatalogo } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setFocus,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    trigger();
    const values = getValues();
    const docData = {
      id: uuidv4(),
      titulo: values.titulo,
    };

    let _catalogo = { ...catalogo };
    _catalogo.listas_precios.push(docData);
    setCatalogo(_catalogo);
    onClose();

    // const doc = await db.createDocument('usuarios', docData);
    // loadUsuarios();
    // onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    setFocus('titulo');
  };

  return (
    <>
      <Button onClick={handleOpen}>Agregar nueva lista de precios</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Agregar nueva lista de precios
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="24px">
                <FormControl isInvalid={errors.titulo}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre de lista de precios"
                    {...register('titulo', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.titulo && errors.titulo.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                mt={8}
                colorScheme="teal"
                isLoading={isSubmitting}
                onClick={onSubmit}
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

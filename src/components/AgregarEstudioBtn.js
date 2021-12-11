import { useForm } from 'react-hook-form';
import { useContext, useRef } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
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
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import FormValidationTexts from '../helpers/FormValidationTexts';
import db from '../helpers/FirestoreService';
import AppContext from '../context/AppContext';
// import AgregarCategoriaBtn from './AgregarCategoriaBtn';
import AgregarListaPreciosBtn from './AgregarListaPreciosBtn';

export default function AgregarEstudioBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { catalogo, loadCatalogo } = useContext(AppContext);
  const { listas_precios } = catalogo;
  const [getRef, setRef] = useDynamicRefs();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    console.log(values);
    const precios = [];
    listas_precios.forEach(lista_precios => {
      const inputVal = getRef(lista_precios.id).current.value;
      const precio = {
        lista_precios: lista_precios.id,
        precio: inputVal,
      };
      precios.push(precio);
    });

    const estudio = {
      nombre: values.nombre,
      precios: precios,
    };

    const _catalogo = { ...catalogo };
    _catalogo.estudios.push(estudio);
    //setCatalogo(_catalogo);
    const doc = await db.createDocumentAs('catalogo', 'idm', _catalogo);
    loadCatalogo();

    onClose();
  };

  const handleOpen = async () => {
    await onOpen();
    setFocus('nombre');
  };

  return (
    <>
      <Button onClick={handleOpen}>Agregar Estudio</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Agregar nuevo estudio
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={errors.nombre}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    placeholder="Nombre de estudio"
                    {...register('nombre', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nombre && errors.nombre.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.duracion}>
                  <FormLabel>Duración</FormLabel>
                  <Input
                    type="number"
                    placeholder="Duración de estudio en minutos"
                    {...register('duracion', {
                      required: FormValidationTexts.requerido,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.duracion && errors.duracion.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.precios}>
                  <FormLabel>Precios</FormLabel>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Lista de precios</Th>
                        <Th>Precio</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listas_precios &&
                        listas_precios.map(lista_precios => {
                          const value = JSON.stringify(lista_precios);
                          return (
                            <Tr key={lista_precios.id}>
                              <Td>{lista_precios.titulo}</Td>
                              <Td>
                                <Input
                                  placeholder="$0.00"
                                  ref={setRef(lista_precios.id)}
                                />
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                  {/* <Flex justifyContent="end" mt={2}>
                    <AgregarListaPreciosBtn />
                  </Flex> */}
                </FormControl>
              </Stack>
              <Divider my={4} />
              <Stack></Stack>
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

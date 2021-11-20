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
import AgregarCategoriaBtn from './AgregarCategoriaBtn';
import AgregarListaPreciosBtn from './AgregarListaPreciosBtn';

export default function AgregarEstudioBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { catalogo } = useContext(AppContext);
  const { categorias, listas_precios } = catalogo;
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async values => {
    console.log(values);
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

                <FormControl isInvalid={errors.categoria}>
                  <FormLabel>Seleccionar Categoria</FormLabel>
                  <Select
                    {...register('categoria', {
                      required: FormValidationTexts.requerido,
                    })}
                  >
                    {categorias &&
                      categorias.map(categoria => {
                        const value = JSON.stringify(categoria);
                        return (
                          <option value={value} key={categoria.id}>
                            {categoria.titulo}
                          </option>
                        );
                      })}
                  </Select>
                  <Flex justifyContent="end" mt={2}>
                    <AgregarCategoriaBtn />
                  </Flex>

                  <FormErrorMessage>
                    {errors.doctor && errors.doctor.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.precios}>
                  <FormLabel>Precios</FormLabel>
                  <Table variant="simple">
                    <TableCaption>Precios del estudio</TableCaption>
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
                            <Tr>
                              <Td>{lista_precios.titulo}</Td>
                              <Td>
                                <NumberInput>
                                  <NumberInputField />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                  <Flex justifyContent="end" mt={2}>
                    <AgregarListaPreciosBtn />
                  </Flex>
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

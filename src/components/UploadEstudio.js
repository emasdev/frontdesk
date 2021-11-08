import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import db from '../helpers/FirestoreService';
import { useForm } from 'react-hook-form';

export default function UploadEstudio({ onUpload, onOpen, doctores }) {

  useEffect(() => {
    if (!doctores) {
      onOpen();
    }
  }, [doctores, onOpen])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async data => {

    const doctor = JSON.parse(data.doctor);
    const nombre_doctor = `${doctor.nombre} ${doctor.apellido_paterno} ${doctor.apellido_materno}`;

    const estudioDocData = {
      estudio: data.estudio,
      doctor: nombre_doctor,
      paciente: data.paciente,
      doctorId: doctor.id,
      fecha: Date.now(),
    };

    await db.createDocument('estudios', estudioDocData);
    onUpload();
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitSuccessful && (
        <Alert status="success">
          <AlertIcon />
          Se subio el estudio con éxito
        </Alert>
      )}
      <FormControl>
        <FormLabel>Estudio</FormLabel>
        <Input
          type="text"
          placeholder="Nombre de estudio"
          {...register('estudio', { required: true })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Nombre de paciente</FormLabel>
        <Input
          type="text"
          placeholder="Nombre de paciente"
          {...register('paciente', { required: true })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Subir estudio</FormLabel>
        <Input type="file" {...register('file', { required: true })} />
      </FormControl>
      <FormControl>
        <FormLabel>Seleccionar Doctor</FormLabel>
        <Select
          placeholder="Seleccionar Doctor"
          {...register('doctor', { required: true })}
        >
          {doctores &&
            doctores.map(data => {
              const nombre = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`;
              const dataJSON = JSON.stringify(data);
              return (
                <option value={dataJSON} key={data.id}>
                  {nombre}
                </option>
              );
            })}
        </Select>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Subir estudio
      </Button>
    </form>
  );
}

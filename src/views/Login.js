import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Heading,
} from '@chakra-ui/react';

import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    auth.signin(data.email, data.password);
  };
  console.log(errors);

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading mb={4}>Login</Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register('password', { required: true })}
          />
        </FormControl>

        <Button mt={4} type="submit">
          Ingresar
        </Button>
      </form>
    </Center>
  );
}

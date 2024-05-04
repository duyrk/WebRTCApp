'use client';

import {
  Button,
  Center,
  Container,
  Image,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMemo } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { joiResolver } from 'mantine-form-joi-resolver';
import { IconLock, IconUserShield } from '@tabler/icons-react';

import { LoginSchema } from './login.validator';
import { ILoginRequest } from '@services/service';
import { AuthService, DefaultResponse } from '@services';

import { AuthUtils } from '@utils';
import { ERole } from '@global/enum';
import { IUser } from '@global/global';
import styles from './login.module.css';
import { useRouter } from '@libs/patch-router';
import { useLocalStorage } from '@mantine/hooks';
import { EStorageKey } from '@services/StorageService';

export default function LoginPage() {
  const routes = useRouter();
  const [, setUserData] = useLocalStorage<IUser>({
    key: EStorageKey.UserData,
  });

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: AuthService.login,
    mutationKey: ['login'],
    onSuccess(data) {
      if (data.data.user.role === ERole.ADMIN) {
        routes.replace('/dashboard');

        // storage user data
        AuthUtils.setTokenData(data.data.token);
        setUserData(data.data.user);
      }
    },
  });

  const commonError = useMemo(() => {
    if (isError) {
      return (JSON.parse(error.message) as DefaultResponse).message;
    }

    const userRole = data?.data.user.role;
    if (userRole) {
      return userRole === ERole.USER ? 'Account has invalid role' : undefined;
    }
  }, [data, isError]);

  const loginForm = useForm({
    name: 'loginForm',
    initialValues: {
      username: '',
      password: '',
    },
    validate: joiResolver(LoginSchema),
  });

  const handleSubmit = (body: ILoginRequest) => {
    mutate(body);
  };

  return (
    <Container size={420} pt={120}>
      <Center mb={20}>
        <Image src={'./web-icon.png'} w={120} className={styles.app_logo} />
      </Center>

      <Title ta="center" fw={'bolder'} c={'white'}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={loginForm.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="TranVux"
            leftSection={<IconUserShield strokeWidth={2} />}
            {...loginForm.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            leftSection={<IconLock strokeWidth={2} />}
            mt="md"
            {...loginForm.getInputProps('password')}
          />
          {commonError ? (
            <Text mt="md" className={styles.textError}>
              {commonError}
            </Text>
          ) : (
            <></>
          )}
          <Button
            mt="xl"
            fullWidth
            type="submit"
            variant={'white'}
            loading={isPending}
            className={'hover:bg-gray-200'}
          >
            <Text c={'black'}>Sign in</Text>
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

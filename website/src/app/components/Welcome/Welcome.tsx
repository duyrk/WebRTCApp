import { Title, Text, Anchor, Button, useStyles } from '@mantine/core';
import classes from './Welcome.module.css';
import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '@services';
import { getBaseUrlApi } from '@utils';
import React from 'react';

export function Welcome() {
  const { data, isFetching } = useQuery({
    queryKey: ['getPokemonByName'],
    queryFn: async () => {
      const res = await PokemonService.getPokemonByName('pikachu');
      console.log(res);
      return res;
    },
    throwOnError: true,
  });
  if (isFetching)
    return (
      <>
        {' '}
        <Text className={'text-4xl accent-red-600'}>Loading...</Text>
      </>
    );
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit page.tsx file.
      </Text>
      <h1 className={'font-bold text-4xl'}>Hello</h1>
      <Button fullWidth bg={'#02B1AB'}>
        <Text>Mua hàng</Text>
      </Button>
      <Text className={'text-4xl accent-red-600'}>{data?.name ?? 'pokemon name'}</Text>
      <Text className={'text-4xl accent-red-600'}>{data?.id ?? 'id'}</Text>
    </>
  );
}

'use client';

import { Button, Group, useMantineColorScheme, Text } from '@mantine/core';
import countAtom from '@states/atoms/countAtom';
import countAtomStorage from '@states/atomsStorage/countAtom';
import { useAtom } from 'jotai';
import Link from 'next/link';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const [count, setCount] = useAtom(countAtom);
  const [countS, setCountS] = useAtom(countAtomStorage);
  return (
    <Group justify="center" mt="xl">
      <Text>count: {count}</Text>
      <Text>count in storage: {countS}</Text>
      <Button color='hello.9' onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
      <Button>
        <Link href={'/pokemon'}>Hey</Link>
      </Button>
      <Button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        <Text>Decrease count</Text>
      </Button>
      <Button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        <Text>Increase count</Text>
      </Button>
      <Button
        onClick={() => {
          setCountS((prev) => prev - 1);
        }}
      >
        <Text>Decrease count storage</Text>
      </Button>
      <Button
        onClick={() => {
          setCountS((prev) => prev + 1);
        }}
      >
        <Text>Increase count storage</Text>
      </Button>
    </Group>
  );
}

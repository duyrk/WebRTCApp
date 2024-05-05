'use client';
// `app/pokemon/page.tsx` is the UI for the `/pokemon` URL
import { Box, Button, Group, Text } from '@mantine/core';
import countAtom from '@states/atoms/countAtom';
import pokemonAtom from '@states/atoms/pokeAtoms';
import countAtomStorage from '@states/atomsStorage/countAtom';
import { atom, useAtom, useStore } from 'jotai';
import { useImmerAtom } from 'jotai-immer';
import { notFound } from 'next/navigation';
const userDataAtom = atom({ name: 'John', age: 12 });
const primitiveAtom = atom({ value: 0 });
export default function Page() {
  //throw an Error to trigger error.tsx
  // throw new Error('Could not find the pokemon');
  //call notFound function to trigger not-found.tsx
  // notFound();
  const [userData, setUserData] = useAtom(userDataAtom);
  const [count, setCount] = useAtom(countAtomStorage);
  const store = useStore();

  const [immerCount, setImmerCount] = useImmerAtom(primitiveAtom);
  const [pokemon, setPokemon] = useImmerAtom(pokemonAtom);
  const inc = () => {
    setImmerCount((draft) => {
      ++draft.value;
    });
    console.log('hey');
  };
  const changePokemonName = (name: string) => {
    setPokemon((draft) => {
      draft.name = name;
    });
  };
  return (
    <Group>
      <Box w={'100%'} bg={'red'}>
        <Text size="xl" fw={700} tt={'uppercase'}>
          Hellooooo, {userData.name}
        </Text>
        {/* <Text >
          {count}
        </Text> */}

        {/* Take value straight forward from store */}
        <Text>{store.get(countAtomStorage)}</Text>
        <Text>Immer count: {immerCount.value}</Text>
        <Button onClick={inc}>Click</Button>
        <Text>Pokemon: {pokemon.name}</Text>
        <Button
          onClick={() => {
            changePokemonName('charmander');
          }}
        >
          Charmander
        </Button>
        <Button
          onClick={() => {
            changePokemonName('squirtle');
          }}
        >
          squirtle
        </Button>
        <Button
          onClick={() => {
            changePokemonName('Pikachu');
          }}
        >
          pikachu
        </Button>
      </Box>
    </Group>
  );
}

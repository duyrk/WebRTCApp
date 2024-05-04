import { atomWithStorage } from 'jotai/utils';
// atom will be persisted
export interface IPokemonStorage {
  id: string;
  name: string;
  height: number;
  weight: number;
}
const initialState: IPokemonStorage = {
  id: '',
  name: '',
  height: 0,
  weight: 0,
};

const pokemonAtomStorage = atomWithStorage('pokemon', initialState);
export default pokemonAtomStorage;

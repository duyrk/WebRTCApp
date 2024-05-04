import { atom } from "jotai";

export interface IPokemon {
    id:string
    name:string;
    height: number
    weight: number
}
const initialState: IPokemon = {
id:'',
name:'',
height:0,
weight:0,
}

const pokemonAtom = atom(initialState)
pokemonAtom.debugLabel = 'pokemon atom'
export default pokemonAtom
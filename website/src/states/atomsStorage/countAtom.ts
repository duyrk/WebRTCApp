import { atomWithStorage } from "jotai/utils"

const initialState = 0

const countAtomStorage = atomWithStorage('count', initialState)
countAtomStorage.debugLabel = 'count storage atom'
export default countAtomStorage
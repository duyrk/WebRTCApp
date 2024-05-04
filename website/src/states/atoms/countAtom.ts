import { count } from "console"
import { atom } from "jotai"

const initialState = 0

const countAtom = atom(initialState)
countAtom.debugLabel = 'count atom'
export default countAtom
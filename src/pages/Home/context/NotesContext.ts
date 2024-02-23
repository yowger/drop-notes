import React from "react"

import type { INote } from "../types/note"

export interface INotesContext {
    notes: INote[]
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>
}

const defaultState: INotesContext = {
    notes: [],
    setNotes: () => {},
}

export default React.createContext(defaultState)

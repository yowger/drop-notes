import { useState } from "react"

import database from "../../../database/db.json"

import NotesContext from "../context/NotesContext"

import type { INotesContext } from "../context/NotesContext"
import type { INote } from "../types/note"

interface IAuthContextProviderProps {
    children: React.ReactNode
}

export default function NotesContextProvider({
    children,
}: IAuthContextProviderProps) {
    const [notes, setNotes] = useState<INote[]>(database.notes as INote[])

    const notesContextValue: INotesContext = {
        notes,
        setNotes,
    }

    return (
        <NotesContext.Provider value={notesContextValue}>
            {children}
        </NotesContext.Provider>
    )
}

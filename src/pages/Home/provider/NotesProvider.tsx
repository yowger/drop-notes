import database from "../../../database/db.json"

import NotesContext from "../context/NotesContext"

import { useLocalStorage } from "../../../hooks/useLocalStorage"

import type { INotesContext } from "../context/NotesContext"
import type { INote } from "../types/note"

interface IAuthContextProviderProps {
    children: React.ReactNode
}

export default function NotesContextProvider({
    children,
}: IAuthContextProviderProps) {
    const noteData = database.notes as INote[]
    const [notes, setNotes] = useLocalStorage<INote[]>("notes", noteData)

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

import { useEffect } from "react"

import NotesContext from "../context/NotesContext"

import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { useReadLocalStorage } from "../../../hooks/useReadLocalStorage"

import type { INotesContext } from "../context/NotesContext"
import type { INote } from "../types/note"

interface IAuthContextProviderProps {
    children: React.ReactNode
}

export default function NotesContextProvider({
    children,
}: IAuthContextProviderProps) {
    const notesData = useReadLocalStorage<INote[]>("notes") || null
    const [notes, setNotes] = useLocalStorage<INote[]>("notes", [])

    useEffect(() => {
        if (notesData !== null) {
            setNotes(notesData)
        } else {
            import("../../../database/db.json")
                .then((databaseModule) => {
                    const database = databaseModule.default
                    setNotes(database.notes as INote[])
                })
                .catch((error) => {
                    console.error("Error importing database:", error)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

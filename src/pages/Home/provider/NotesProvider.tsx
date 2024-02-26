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
        const fetchNotes = async () => {
            try {
                if (notesData !== null) {
                    setNotes(notesData)
                } else {
                    const databaseModule = await import(
                        "../../../database/db.json"
                    )
                    const database = databaseModule.default as {
                        notes: INote[]
                    }
                    setNotes(database.notes)
                }
            } catch (error) {
                console.error("Error fetching notes:", error)
            }
        }

        fetchNotes()
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

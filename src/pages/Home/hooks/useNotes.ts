import { useContext } from "react"

import NotesContext from "../context/NotesContext"

import type { INote, TNoteStatus } from "../types/note"

export default function useNotes() {
    const { notes, setNotes } = useContext(NotesContext)

    const addNote = (newNote: INote) => {
        setNotes([...notes, newNote])
    }

    const updateNote = (id: string, updatedNote: INote) => {
        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)))
    }

    const deleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    const reorderNotes = (
        noteIdToTransfer: string,
        noteId: string,
        status: TNoteStatus
    ) => {
        if (noteIdToTransfer === noteId) return

        let notesCopy: INote[] = [...notes]

        let noteToTransfer: INote | undefined = notesCopy.find(
            (note) => note.id === noteIdToTransfer
        )

        if (!noteToTransfer) return

        noteToTransfer = { ...noteToTransfer, status }

        notesCopy = notesCopy.filter((note) => note.id !== noteIdToTransfer)

        const noteIdIndex = notesCopy.findIndex((note) => note.id === noteId)

        notesCopy.splice(noteIdIndex, 0, noteToTransfer)

        setNotes(notesCopy)
    }

    return { notes, addNote, updateNote, deleteNote, reorderNotes }
}

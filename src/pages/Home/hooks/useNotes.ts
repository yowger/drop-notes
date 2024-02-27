import { useContext } from "react"

import NotesContext from "../context/NotesContext"

import type { INote, TNoteStatus } from "../types/note"

export default function useNotes() {
    const { notes, setNotes } = useContext(NotesContext)

    const generateNoteId = (): string => {
        const maxId = notes.reduce((max, note) => {
            const noteId = parseInt(note.id, 10)
            return noteId > max ? noteId : max
        }, 0)

        return String(maxId + 1)
    }

    const addNote = (newNote: INote) => {
        setNotes((prevNotes) => [...prevNotes, newNote])
    }

    const addNoteAtIndex = (newNote: INote, index: string) => {
        setNotes((prevNotes) => {
            const prevNotesCopy = [...prevNotes]

            const noteIdIndex = notes.findIndex((note) => note.id === index)

            prevNotesCopy.splice(noteIdIndex, 0, newNote)

            return prevNotesCopy
        })
    }

    const updateNote = (id: string, updatedNote: INote) => {
        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)))
    }

    const deleteNote = (id: string) => {
        const deletedNote = notes.find((note) => note.id === id)

        if (deletedNote) {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
        }
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

    return {
        notes,
        generateNoteId,
        addNote,
        addNoteAtIndex,
        updateNote,
        deleteNote,
        reorderNotes,
    }
}

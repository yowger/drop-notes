import { useState } from "react"
import { AnimatePresence } from "framer-motion"

import useNotes from "../hooks/useNotes"

import { toastUndo } from "../../../components/Toast/Toast"
import NoteDropIndicator from "./NoteDropIndicator"
import NoteWithIndicator from "./NoteWithIndicator"

import type { INote, TNoteStatus } from "../types/note"

interface INoteListProps {
    notes: INote[]
    type: TNoteStatus
}

export default function NoteList({ notes, type }: INoteListProps) {
    const { addNoteAtIndex, deleteNote, reorderNotes } = useNotes()
    const [isDragOVer, setIsDragOver] = useState(false)

    const handleNoteDragStart = (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.dataTransfer.setData("note_id", note.id)
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        highlightIndicator(event)

        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)

        clearHighlightIndicators()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        setIsDragOver(false)

        clearHighlightIndicators()

        const noteId = event.dataTransfer.getData("note_id")

        const notesIndicators = getNotesIndicator()
        const nearestIndicator = getNearestIndicator(
            event.clientY,
            notesIndicators
        )

        if (nearestIndicator) {
            const nearestNoteId = nearestIndicator.dataset.noteId as string
            const nearestNoteStatus = nearestIndicator.dataset
                .noteType as TNoteStatus

            reorderNotes(noteId, nearestNoteId, nearestNoteStatus)
        }
    }

    const getNotesIndicator = (): Element[] => {
        return Array.from(
            document.querySelectorAll(`[data-note-type="${type}"]`)
        )
    }

    const getNearestIndicator = (
        mouseY: number,
        indicators: Element[]
    ): HTMLElement | null => {
        let nearestIndicator: HTMLElement | null = null
        let nearestDistance = Number.MAX_VALUE

        indicators.forEach((indicator: Element) => {
            const rect = indicator.getBoundingClientRect()
            const elementCenterY = (rect.top + rect.bottom) / 2
            const distance = Math.abs(elementCenterY - mouseY)
            if (distance < nearestDistance) {
                nearestIndicator = indicator as HTMLElement
                nearestDistance = distance
            }
        })

        return nearestIndicator
    }

    const highlightIndicator = (event: React.DragEvent<HTMLDivElement>) => {
        const notesIndicators = getNotesIndicator()
        clearHighlightIndicators(notesIndicators)

        const nearestIndicator = getNearestIndicator(
            event.clientY,
            notesIndicators
        )

        if (nearestIndicator) {
            nearestIndicator.classList.add("bg-slate-200")
        }
    }

    const clearHighlightIndicators = (indicators?: Element[]) => {
        const currentIndicators = indicators || getNotesIndicator()

        currentIndicators.forEach((indicator) => {
            indicator.classList.remove("bg-slate-200")
        })
    }

    const handleDeleteNote = (note: INote) => {
        deleteNote(note.id)

        toastUndo({
            message: "Note deleted",
            handleCallback: () => handleDeleteNoteCallback(note),
        })
    }

    const handleDeleteNoteCallback = (note: INote) => {
        addNoteAtIndex(note, note.id)
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 flex flex-col px-1.5 md:px-3 lg:px-4 border-2 border-dashed ${
                isDragOVer ? "border-slate-200" : "border-transparent"
            }`}
        >
            <AnimatePresence>
                {notes.map((note) => (
                    <NoteWithIndicator
                        key={note.id}
                        note={note}
                        handleDragStart={handleNoteDragStart}
                        handleDeleteNote={handleDeleteNote}
                    />
                ))}
                <NoteDropIndicator id="-1" noteStatus={type} />
            </AnimatePresence>
        </div>
    )
}

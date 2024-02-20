import useNotes from "../hooks/useNotes"

import NoteWithIndicator from "./NoteWithIndicator"

import type { INote, TNoteStatus } from "../types/note"

interface INoteListProps {
    notes: INote[]
    type: TNoteStatus
}

export default function NoteList({ notes, type }: INoteListProps) {
    const { reorderNotes } = useNotes()

    const handleDragStart = (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => {
        event.dataTransfer.setData("note_id", note.id)
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex flex-col gap-y-3"
        >
            {notes.map((note) => (
                <NoteWithIndicator
                    key={note.id}
                    note={note}
                    handleDragStart={handleDragStart}
                />
            ))}
        </div>
    )
}

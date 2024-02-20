import Note from "./Note"
import NoteDropIndicator from "./NoteDropIndicator"

import type { INote } from "../types/note"

interface INoteWithIndicatorProps {
    note: INote
    handleDragStart?: (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => void
}

export default function NoteWithIndicator({
    note,
    handleDragStart,
}: INoteWithIndicatorProps) {
    return (
        <div>
            <NoteDropIndicator id={note.id} noteStatus={note.status} />
            <Note note={note} handleDragStart={handleDragStart} />
        </div>
    )
}

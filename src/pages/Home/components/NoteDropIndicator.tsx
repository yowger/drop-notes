import type { TNoteStatus } from "../types/note"

interface INoteDropIndicatorProps {
    id: string
    noteStatus: TNoteStatus
}

export default function NoteDropIndicator({
    id,
    noteStatus,
}: INoteDropIndicatorProps) {
    return <div data-note-id={id} data-note-type={noteStatus} className="" />
}

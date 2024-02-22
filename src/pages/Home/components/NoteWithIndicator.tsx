import Note from "./Note"
import NoteDropIndicator from "./NoteDropIndicator"

import type { INote } from "../types/note"
import { motion } from "framer-motion"

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
        <>
            <NoteDropIndicator id={note.id} noteStatus={note.status} />
            <motion.div layout layoutId={note.id}>
                <Note note={note} handleDragStart={handleDragStart} />
            </motion.div>
        </>
    )
}

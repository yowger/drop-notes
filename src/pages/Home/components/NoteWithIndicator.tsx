import Note from "./Note"
import NoteDropIndicator from "./NoteDropIndicator"

import type { INoteProps } from "./Note"

interface INoteWithIndicatorProps extends INoteProps {}

export default function NoteWithIndicator({
    note,
    ...otherProps
}: INoteWithIndicatorProps) {
    return (
        <>
            <NoteDropIndicator id={note.id} noteStatus={note.status} />
            <Note note={note} {...otherProps} />
        </>
    )
}

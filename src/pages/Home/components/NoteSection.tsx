import NoteList from "./NoteList"
import NoteTitle from "./NoteTitle"

import type { INote, TNoteStatus } from "../types/note"

interface INoteSectionProps {
    title: string
    type: TNoteStatus
    notes: INote[]
    Icon: React.ReactNode
}

export default function NoteSection({
    title,
    notes,
    type,
    Icon,
}: INoteSectionProps) {
    const filteredNotes = notes.filter((note) => note.status === type)
    const notesLength = filteredNotes.length

    return (
        <section className="flex flex-col gap-3">
            <NoteTitle title={title} notesLength={notesLength} Icon={Icon} />
            <NoteList notes={filteredNotes} type={type} />
        </section>
    )
}

import NoteList from "./NoteList"
import NoteTitle from "./NoteTitle"

import type { INote, TNoteStatus } from "../types/note"

interface INoteSectionProps {
    title: string
    type: TNoteStatus
    notes: INote[]
}

export default function NoteSection({ title, notes, type }: INoteSectionProps) {
    const filteredNotes = notes.filter((note) => note.status === type)
    const notesLength = notes.length

    return (
        <section className="">
            <NoteTitle title={title} notesLength={notesLength} />
            <NoteList notes={filteredNotes} type={type} />
        </section>
    )
}

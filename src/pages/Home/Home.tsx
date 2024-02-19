import { useEffect, useState } from "react"

import { STATUS } from "../../constants/status"

import { useNotesByStatus } from "../../hooks/useNotesByStatus"
import useFetch from "../../hooks/useFetch"

import type { INote } from "../../types/noteTypes"
import type { TStatus } from "../../types/statusTypes"

import noteRequest from "../../requests/noteRequest"

export default function Home() {
    return (
        <div>
            <NoteBoard />
        </div>
    )
}

function NoteBoard() {
    const { result, error, isLoading, isSuccess } = useFetch(() =>
        noteRequest.get()
    )

    const [notes, setNotes] = useState<INote[]>([])

    useEffect(() => {
        if (result) {
            setNotes(result)
        }
    }, [result])

    const { todoNotes, inProgressNotes, completedNotes } =
        useNotesByStatus(notes)

    return (
        <div>
            <NoteSection title="Todo" notes={todoNotes} type={STATUS.TODO} />
            <NoteSection
                title="In progress"
                notes={inProgressNotes}
                type={STATUS.IN_PROGRESS}
            />
            <NoteSection
                title="Completed"
                notes={completedNotes}
                type={STATUS.COMPLETED}
            />
        </div>
    )
}

interface INoteSectionProps {
    title: string
    notes: INote[]
    type: TStatus
}

function NoteSection({ title, notes, type }: INoteSectionProps) {
    return (
        <section>
            <h1>{title}</h1>
        </section>
    )
}

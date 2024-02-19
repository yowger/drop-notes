import { useEffect, useState } from "react"

import type { INote } from "../types/noteTypes"

import { STATUS } from "../constants/status"

export const useNotesByStatus = (notes: INote[]) => {
    const [todoNotes, setTodoNotes] = useState<INote[]>([])
    const [inProgressNotes, setInProgressNotes] = useState<INote[]>([])
    const [completedNotes, setCompletedNotes] = useState<INote[]>([])

    useEffect(() => {
        setTodoNotes(notes.filter((note) => note.status === STATUS.TODO))
        setInProgressNotes(
            notes.filter((note) => note.status === STATUS.IN_PROGRESS)
        )
        setCompletedNotes(
            notes.filter((note) => note.status === STATUS.COMPLETED)
        )
    }, [notes])

    return { todoNotes, inProgressNotes, completedNotes }
}

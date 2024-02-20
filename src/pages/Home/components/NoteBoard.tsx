import { NOTE_STATUS } from "../constants"

import NoteSection from "./NoteSection"

import useNotes from "../hooks/useNotes"

export default function NoteBoard() {
    const { notes } = useNotes()

    return (
        <div className="w-full grid grid-cols-3 gap-3 mg:gap-6 lg:gap-8">
            <NoteSection title="Todo" notes={notes} type={NOTE_STATUS.TODO} />
            <NoteSection
                title="In progress"
                notes={notes}
                type={NOTE_STATUS.IN_PROGRESS}
            />
            <NoteSection
                title="Completed"
                notes={notes}
                type={NOTE_STATUS.COMPLETED}
            />
        </div>
    )
}

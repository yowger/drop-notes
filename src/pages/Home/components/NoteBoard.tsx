import { useContext } from "react"
import { IconCheck, IconSticker2, IconClockHour4 } from "@tabler/icons-react"

import { NOTE_STATUS } from "../constants/note"

import NotesContext from "../context/NotesContext"

import NoteSection from "./NoteSection"

export default function NoteBoard() {
    const { notes } = useContext(NotesContext)

    return (
        <div className="grid grid-cols-3">
            <NoteSection
                title="Todo"
                notes={notes}
                type={NOTE_STATUS.TODO}
                Icon={
                    <IconSticker2
                        size={21}
                        className="text-white bg-slate-400 rounded-md p-0.5"
                    />
                }
            />
            <NoteSection
                title="In progress"
                notes={notes}
                type={NOTE_STATUS.IN_PROGRESS}
                Icon={
                    <IconClockHour4
                        size={21}
                        className="text-white bg-yellow-400 rounded-md p-0.5"
                    />
                }
            />
            <NoteSection
                title="Completed"
                notes={notes}
                type={NOTE_STATUS.COMPLETED}
                Icon={
                    <IconCheck
                        size={21}
                        className="text-white bg-green-400 rounded-md p-0.5"
                    />
                }
            />
        </div>
    )
}

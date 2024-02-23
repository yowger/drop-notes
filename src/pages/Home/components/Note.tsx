import { useState } from "react"
import { motion } from "framer-motion"

import { IconDots } from "@tabler/icons-react"

import Background from "../../../components/Background/Background"
import { toastUndo } from "../../../components/toast/Toast"

import useNotes from "../hooks/useNotes"

import type { INote } from "../types/note"

interface INoteProps {
    note: INote
    handleDragStart: (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => void
}

export default function Note({ note, handleDragStart }: INoteProps) {
    const { addNote, deleteNote } = useNotes()

    const [isNoteOpened, setIsNoteOpened] = useState(false)

    const handleClick = () => {
        setIsNoteOpened((prev) => !prev)
    }

    const handleClose = () => {
        setIsNoteOpened(false)
    }

    const handleCallback = (note: INote) => {
        addNote(note, note.id)
    }

    const handleDelete = () => {
        deleteNote(note.id)

        toastUndo({
            message: "Note deleted",
            handleCallback: () => handleCallback(note),
        })
    }

    const handleUpdate = () => {}

    return (
        <>
            <motion.div
                layout
                layoutId={note.id}
                transition={{ layout: { duration: 0.25 }, ease: "easeOut" }}
                exit={{ opacity: 0, scale: 0.75 }}
                draggable={isNoteOpened ? false : true}
                onDragStart={(event) => handleDragStart(note, event)}
                className={`group/item bg-white border rounded-md p-3 flex flex-col ${
                    isNoteOpened &&
                    "fixed z-20 h-3/6 w-4/5 md:w-2/4 lg:w-1/3 m-auto inset-x-0 inset-y-0"
                }`}
            >
                <motion.div
                    layout="position"
                    className="flex items-center mb-2"
                >
                    <NoteTitle title={note.title} isNoteOpened={isNoteOpened} />

                    {isNoteOpened ? null : (
                        <NoteHeaderMenu
                            handleClick={handleClick}
                            isNoteOpened={isNoteOpened}
                        />
                    )}
                </motion.div>

                <NoteDescription
                    description={note.description}
                    isNoteOpened={isNoteOpened}
                />

                {isNoteOpened && (
                    <NoteMenu
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                )}
            </motion.div>

            {isNoteOpened && <Background handleClick={handleClose} />}
        </>
    )
}

const NoteTitle = ({
    title,
    isNoteOpened,
}: {
    title: string
    isNoteOpened: boolean
}) => {
    return (
        <motion.h1
            layout="position"
            className={`text-base font-medium text-slate-900 flex-1 ${
                isNoteOpened ? "" : "line-clamp-2"
            }`}
        >
            {title}
        </motion.h1>
    )
}

const NoteHeaderMenu = ({
    handleClick,
}: {
    handleClick: React.MouseEventHandler<HTMLButtonElement>
    isNoteOpened: boolean
}) => {
    return (
        <button
            onClick={handleClick}
            className="group-hover/item:visible invisible text-slate-500 active:text-slate-900"
        >
            <IconDots />
        </button>
    )
}

const NoteDescription = ({
    description,
    isNoteOpened,
}: {
    description: string
    isNoteOpened: boolean
}) => {
    return (
        <motion.p
            layout="position"
            className={`text-[14px] text-slate-600 flex-1 overflow-hidden ${
                isNoteOpened ? "overflow-y-auto" : "line-clamp-5"
            }`}
        >
            {description}
        </motion.p>
    )
}

const NoteMenu = ({
    handleDelete,
    handleUpdate,
}: {
    handleDelete: React.MouseEventHandler<HTMLButtonElement>
    handleUpdate: React.MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-3 mt-4"
        >
            <button
                onClick={handleDelete}
                className="border rounded px-4 py-2 text-sm"
            >
                Delete
            </button>
            <button
                onClick={handleUpdate}
                className="bg-blue-400 text-white rounded px-4 py-2 text-sm"
            >
                Update
            </button>
        </motion.div>
    )
}

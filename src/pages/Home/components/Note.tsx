import { useState } from "react"
import { motion } from "framer-motion"
import { IconDots } from "@tabler/icons-react"

import Background from "../../../components/Background/Background"

import type { INote } from "../types/note"

interface INoteProps {
    note: INote
    handleDragStart: (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => void
}

export default function Note({ note, handleDragStart }: INoteProps) {
    const [isNoteOpened, setIsNoteOpened] = useState(false)

    const handleClick = () => {
        setIsNoteOpened((prev) => !prev)
    }

    const handleClose = () => {
        console.log("close background")
        setIsNoteOpened(false)
    }

    return (
        <>
            <motion.div
                layout
                layoutId={note.id}
                transition={{ ease: "easeOut" }}
                draggable={true}
                onDragStart={(event) => handleDragStart(note, event)}
                className={`group/item bg-white border-2 rounded-md p-3 flex flex-col ${
                    isNoteOpened &&
                    "fixed z-20 h-3/6 w-4/5 md:w-2/4 lg:w-1/3 m-auto inset-x-0 inset-y-0"
                }`}
            >
                <motion.div
                    layout="position"
                    className="flex items-center mb-2"
                >
                    <NoteTitle title={note.title} />

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

                {isNoteOpened && <NoteMenu />}
            </motion.div>

            {isNoteOpened && <Background handleClick={handleClose} />}
        </>
    )
}

const NoteTitle = ({ title }: { title: string }) => {
    return (
        <motion.h1
            layout="position"
            className="text-base font-medium text-slate-900 flex-1"
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
            className={`text-[14px] text-slate-600 flex-1  ${
                isNoteOpened ? "overflow-y-auto" : "line-clamp-5"
            }`}
        >
            {description}
        </motion.p>
    )
}

const NoteMenu = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-3 mt-4"
        >
            <button className="border rounded px-4 py-2 text-sm">Delete</button>
            <button className="bg-blue-400 text-white rounded px-4 py-2 text-sm">
                Update
            </button>
        </motion.div>
    )
}

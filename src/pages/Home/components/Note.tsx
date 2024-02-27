import { useCallback, useEffect, useRef, useState } from "react"
import DOMPurify from "dompurify"
import { motion } from "framer-motion"

import { IconDots } from "@tabler/icons-react"

import Background from "../../../components/Background/Background"
import Button from "../../../components/elements/Button"

import type { INote } from "../types/note"

export interface INoteProps {
    note: INote
    handleDeleteNote: (note: INote) => void
    handleUpdateNote: (noteId: string, updatedNote: INote) => void
    handleDragStart: (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => void
}

export default function Note({
    note,
    handleDragStart,
    handleUpdateNote,
    handleDeleteNote,
}: INoteProps) {
    const [isNoteOpened, setIsNoteOpened] = useState(false)
    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)
    const hasRenderedRef = useRef(false)

    const handleTitleBlur = useCallback(
        (event: React.FocusEvent<HTMLHeadingElement>) => {
            const sanitizeTitle = DOMPurify.sanitize(
                event.currentTarget.innerHTML
            )

            setTitle(sanitizeTitle)
        },
        []
    )

    const handleDescriptionBlur = useCallback(
        (event: React.FocusEvent<HTMLHeadingElement>) => {
            const sanitizeDescription = DOMPurify.sanitize(
                event.currentTarget.innerHTML
            )

            setDescription(sanitizeDescription)
        },
        []
    )

    const handleClick = () => {
        setIsNoteOpened((prev) => !prev)
    }

    const handleClose = () => {
        setIsNoteOpened(false)
    }

    const handleUpdate = () => {
        const updatedNote: INote = {
            id: note.id,
            status: note.status,
            title,
            description,
        }

        handleUpdateNote(note.id, updatedNote)
    }

    const handleDelete = () => {
        handleDeleteNote(note)
    }

    useEffect(() => {}, [])

    useEffect(() => {
        hasRenderedRef.current = true
    }, [])

    useEffect(() => {
        if (!hasRenderedRef.current) return

        handleUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description])

    return (
        <>
            <div
                draggable={isNoteOpened ? false : true}
                onDragStart={(event) => handleDragStart(note, event)}
            >
                <motion.div
                    layout
                    layoutId={note.id}
                    transition={{ layout: { duration: 0.25 }, ease: "easeOut" }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    className={`group/item bg-white border rounded-md p-3 flex flex-col ${
                        isNoteOpened &&
                        "fixed z-20 h-3/6 w-4/5 md:w-2/4 lg:w-1/3 m-auto inset-x-0 inset-y-0"
                    }`}
                >
                    <motion.div
                        layout="position"
                        className="flex items-center mb-2"
                    >
                        <NoteTitle
                            title={title}
                            isNoteOpened={isNoteOpened}
                            handleBlur={handleTitleBlur}
                        />

                        {isNoteOpened ? null : (
                            <NoteHeaderMenu
                                handleClick={handleClick}
                                isNoteOpened={isNoteOpened}
                            />
                        )}
                    </motion.div>

                    <NoteDescription
                        description={description}
                        isNoteOpened={isNoteOpened}
                        handleBlur={handleDescriptionBlur}
                    />

                    {isNoteOpened && (
                        <NoteMenu
                            handleClose={handleClose}
                            handleDelete={handleDelete}
                        />
                    )}
                </motion.div>
            </div>

            {isNoteOpened && <Background handleClick={handleClose} />}
        </>
    )
}

const NoteTitle = ({
    title,
    isNoteOpened,
    handleBlur,
}: {
    title: string
    isNoteOpened: boolean
    handleBlur: (event: React.FocusEvent<HTMLHeadingElement>) => void
}) => {
    return (
        <motion.h1
            layout="position"
            contentEditable={isNoteOpened}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{ __html: title }}
            className={`text-base font-medium text-slate-900 flex-1 ${
                isNoteOpened ? "" : "line-clamp-2"
            }`}
        />
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
    handleBlur,
}: {
    description: string
    isNoteOpened: boolean
    handleBlur: (event: React.FocusEvent<HTMLParagraphElement>) => void
}) => {
    return (
        <motion.p
            layout="position"
            contentEditable={isNoteOpened}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{ __html: description }}
            className={`text-[14px] text-slate-600 flex-1 overflow-hidden ${
                isNoteOpened ? "overflow-y-auto" : "line-clamp-5"
            }`}
        />
    )
}

const NoteMenu = ({
    handleClose,
    handleDelete,
}: {
    handleClose: React.MouseEventHandler<HTMLButtonElement>
    handleDelete: React.MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between mt-4 items-center"
        >
            <Button variant="ghost" onClick={handleDelete}>
                Delete
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Confirm
            </Button>
        </motion.div>
    )
}

import { useEffect, useRef, useState } from "react"
import { IconCheck, IconSticker2, IconClockHour4 } from "@tabler/icons-react"
import DOMPurify from "dompurify"
import { twMerge } from "tailwind-merge"

import { NOTE_STATUS } from "../constants/note.ts"

import useNotes from "../hooks/useNotes.ts"

import Button from "../../../components/Elements/Button"
import IconButton from "../../../components/Elements/IconButton"

import type { TNoteStatus } from "../types/note"

export default function NoteHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState<TNoteStatus>(NOTE_STATUS.TODO)
    const titleRef = useRef<HTMLDivElement>(null)
    const descriptionRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)

    const { addNote, generateNoteId } = useNotes()

    const handleSelectStatus = (status: TNoteStatus) => {
        setStatus(status)
    }

    const handleDivFocus = () => {
        setIsOpen(true)
    }

    const handleAddNote = () => {
        if (!titleRef.current || !descriptionRef.current) return

        const title = titleRef.current.innerText
        const description = descriptionRef.current.innerText

        if (title === "" && description === "") return

        const sanitizedTitle = DOMPurify.sanitize(title)
        const sanitizedDescription = DOMPurify.sanitize(description)

        addNote({
            id: generateNoteId(),
            title: sanitizedTitle,
            description: sanitizedDescription,
            status,
        })

        titleRef.current.innerText = ""
        descriptionRef.current.innerText = ""
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen, divRef])

    return (
        <div
            ref={divRef}
            className={twMerge(
                isOpen ? "shadow-md" : "shadow-sm",
                "max-w-md bg-white border mx-auto mb-10 py-2 rounded-md flex flex-col gap-1"
            )}
        >
            <div
                ref={titleRef}
                contentEditable="true"
                suppressContentEditableWarning={true}
                className={twMerge(isOpen ? "" : "hidden", "px-4 py-2")}
                data-placeholder="title"
            />
            <div
                ref={descriptionRef}
                onFocus={handleDivFocus}
                contentEditable="true"
                suppressContentEditableWarning={true}
                className="px-4 py-2"
                data-placeholder="Write a note"
            />
            <div
                className={twMerge(
                    "px-4 flex justify-between items-center",
                    isOpen ? "" : "hidden"
                )}
            >
                <div className="space-x-1">
                    <IconButton
                        onClick={() => handleSelectStatus(NOTE_STATUS.TODO)}
                        className={
                            status === NOTE_STATUS.TODO ? "bg-gray-100" : ""
                        }
                    >
                        <IconSticker2 size={22} />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            handleSelectStatus(NOTE_STATUS.IN_PROGRESS)
                        }
                        className={
                            status === NOTE_STATUS.IN_PROGRESS
                                ? "bg-gray-100"
                                : ""
                        }
                    >
                        <IconClockHour4 size={22} />
                    </IconButton>
                    <IconButton
                        onClick={() =>
                            handleSelectStatus(NOTE_STATUS.COMPLETED)
                        }
                        className={
                            status === NOTE_STATUS.COMPLETED
                                ? "bg-gray-100"
                                : ""
                        }
                    >
                        <IconCheck size={22} />
                    </IconButton>
                </div>

                <div className="space-x-1">
                    <Button onClick={handleAddNote} variant="primary">
                        Add Note
                    </Button>
                </div>
            </div>
        </div>
    )
}

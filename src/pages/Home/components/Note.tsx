import type { INote } from "../types/note"

interface INoteProps {
    note: INote
    handleDragStart?: (
        note: INote,
        event: React.DragEvent<HTMLDivElement>
    ) => void
}

export default function Note({ note, handleDragStart }: INoteProps) {
    return (
        <div
            draggable={true}
            onDragStart={(event) =>
                handleDragStart && handleDragStart(note, event)
            }
            className="bg-white border-2 rounded-md p-3"
        >
            <div>
                <h1 className="text-base mb-2 font-medium text-slate-900">
                    {note.title}
                </h1>
            </div>

            <div className="">
                <p className="text-[14px] text-slate-600">{note.description}</p>
            </div>
        </div>
    )
}

import { STATUS } from "../../constants/status"

import useFetch from "../../hooks/useFetch"

import type { INote } from "../../types/noteTypes"
import type { TStatus } from "../../types/statusTypes"

import noteRequest from "../../requests/noteRequest"

export default function Home() {
    return (
        <div className="flex flex-1">
            <NoteBoard />
        </div>
    )
}

function NoteBoard() {
    const { result, error, isLoading, isSuccess } = useFetch(() =>
        noteRequest.get()
    )
    const todoNotes =
        result?.filter((note) => note.status === STATUS.TODO) || []
    const inProgressNotes =
        result?.filter((note) => note.status === STATUS.IN_PROGRESS) || []
    const completedNotes =
        result?.filter((note) => note.status === STATUS.COMPLETED) || []

    return (
        <div className="w-full grid grid-cols-3 gap-3 mg:gap-6 lg:gap-8">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {isSuccess && (
                <>
                    <NoteSection
                        title="Todo"
                        notes={todoNotes}
                        type={STATUS.TODO}
                    />
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
                </>
            )}
        </div>
    )
}

interface INoteSectionProps {
    title: string
    notes: INote[]
    type: TStatus
}

function NoteSection({ title, notes, type }: INoteSectionProps) {
    const notesLength = notes.length

    return (
        <section className="">
            <div className="bg-white border-2 rounded-md mb-4 p-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-base uppercase font-medium text-slate-500">
                        {title}
                    </h1>
                    <div className="bg-slate-100 rounded-md">
                        <span className="text-slate-500 font-medium p-2 text-[14px]">
                            {notesLength}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-3">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="bg-white border-2 rounded-md p-3"
                    >
                        <div>
                            <h1 className="text-base mb-2 font-medium text-slate-900">
                                {note.title}
                            </h1>
                        </div>

                        <div className="">
                            <p className="text-[14px] text-slate-600">
                                {note.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

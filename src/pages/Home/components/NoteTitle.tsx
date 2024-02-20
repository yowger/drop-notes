interface INoteTitle {
    title: string
    notesLength: number
}

export default function NoteTitle({ title, notesLength }: INoteTitle) {
    return (
        <div className="bg-white border-2 rounded-md mb-5 p-3">
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
    )
}

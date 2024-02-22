interface INoteTitle {
    title: string
    notesLength: number
    Icon: React.ReactNode
}

export default function NoteTitle({ title, notesLength, Icon }: INoteTitle) {
    return (
        <div className="bg-white border-2 rounded-md p-3 mx-1.5 md:mx-3 lg:mx-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="mr-2.5">{Icon}</span>
                    <h1 className="text-sm uppercase font-semibold text-slate-600">
                        {title}
                    </h1>
                </div>
                <div className="bg-slate-100 rounded-md">
                    <span className="text-slate-500 font-medium p-2 text-sm">
                        {notesLength}
                    </span>
                </div>
            </div>
        </div>
    )
}

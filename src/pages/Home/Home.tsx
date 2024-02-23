import NoteBoard from "./components/NoteBoard"

import NotesContextProvider from "./provider/NotesProvider"

export default function Home() {
    return (
        <NotesContextProvider>
            <div className="mt-3 mb-6">
                {/* <NoteHeader /> */}
                <div className="px-4">
                    <button className="border px-4 py-2 active:bg-slate-200">
                        add
                    </button>
                </div>
                <NoteBoard />
            </div>
        </NotesContextProvider>
    )
}

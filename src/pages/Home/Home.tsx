import NoteBoard from "./components/NoteBoard"

import NotesContextProvider from "./provider/NotesProvider"

export default function Home() {
    return (
        <NotesContextProvider>
            <div className="mt-3 mb-6">
                {/* <NoteHeader /> */}

                <NoteBoard />
            </div>
        </NotesContextProvider>
    )
}

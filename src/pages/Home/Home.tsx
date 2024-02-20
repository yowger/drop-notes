import NoteBoard from "./components/NoteBoard"

import NotesContextProvider from "./provider/NotesProvider"

export default function Home() {
    return (
        <NotesContextProvider>
            <div className="flex flex-1 mt-3">
                {/* <NoteHeader /> */}
                <NoteBoard />
            </div>
        </NotesContextProvider>
    )
}

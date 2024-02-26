import NoteBoard from "./components/NoteBoard"

import NotesContextProvider from "./provider/NotesProvider"

function Home() {
    return (
        <NotesContextProvider>
            <div className="mt-3 mb-6">
                {/* <NoteHeader /> */}
                <NoteBoard />
            </div>
        </NotesContextProvider>
    )
}

export const Component = Home

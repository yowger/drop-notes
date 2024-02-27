import NoteBoard from "./components/NoteBoard"

import NoteHeader from "./components/NoteHeader"
import NotesContextProvider from "./provider/NotesProvider"

import "./styles/home.css"

function Home() {
    return (
        <NotesContextProvider>
            <div className="my-3">
                <NoteHeader />
                <NoteBoard />
            </div>
        </NotesContextProvider>
    )
}

export const Component = Home

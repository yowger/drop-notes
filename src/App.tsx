import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import appRouter from "./router/appRouter"
import PageLoader from "./components/PageLoader/PageLoader"
import CloseButton from "./components/elements/CloseButton"

import "react-toastify/dist/ReactToastify.css"

export default function App() {
    return (
        <>
            <RouterProvider
                router={appRouter}
                fallbackElement={<PageLoader />}
            />
            <ToastContainer
                hideProgressBar
                pauseOnFocusLoss
                position="bottom-left"
                pauseOnHover={true}
                className="w-[80%] md:max-w-sm text-slate-50 text-sm"
                toastClassName="shadow-sm bg-neutral-600 text-neutral-50"
                bodyClassName="mr-3"
                closeButton={CloseButton}
            />
        </>
    )
}

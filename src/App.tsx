import { RouterProvider } from "react-router-dom"

import appRouter from "./router/appRouter"
import PageLoader from "./components/PageLoader/PageLoader"

export default function App() {
    return (
        <RouterProvider router={appRouter} fallbackElement={<PageLoader />} />
    )
}

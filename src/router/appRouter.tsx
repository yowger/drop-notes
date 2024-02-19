import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound/NotFound"

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                lazy: () => import("../pages/About/About"),
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

export default appRouter

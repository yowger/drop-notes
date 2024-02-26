import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                lazy: () => import("../pages/Home/Home"),
            },
            {
                path: "about",
                lazy: () => import("../pages/About/About"),
            },
        ],
    },
    {
        path: "*",
        lazy: () => import("../pages/NotFound/NotFound"),
    },
])

export default appRouter

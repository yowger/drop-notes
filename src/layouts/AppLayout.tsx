import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <div className="bg-neutral-900 text-neutral-50">
            <div className="min-h-screen flex max-w-7xl m-auto px-5">
                <Outlet />
            </div>
        </div>
    )
}

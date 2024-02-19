import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <div className="bg-slate-50 text-neutral-900">
            <div className="min-h-screen flex max-w-7xl m-auto px-5">
                <Outlet />
            </div>
        </div>
    )
}

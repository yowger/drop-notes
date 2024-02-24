import type { ToastContentProps } from "react-toastify"

import Button from "../Elements/Button"

export interface IFeedBackUndoProps extends Partial<ToastContentProps> {
    message: string
    handleCallback: () => void
}

export default function FeedBackUndo({
    message,
    handleCallback,
    closeToast,
}: IFeedBackUndoProps) {
    const handleClick = () => {
        handleCallback()
        closeToast?.()
    }

    return (
        <div className="flex justify-between items-center">
            <p>{message}</p>

            <Button
                variant="ghost"
                onClick={handleClick}
                className="text-yellow-500 hover:bg-neutral-700/30 focus:ring-0"
            >
                undo
            </Button>
        </div>
    )
}

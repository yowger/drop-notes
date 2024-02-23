import type { ToastContentProps } from "react-toastify"

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
        <div className="flex justify-between">
            <span className="">{message}</span>
            <button onClick={handleClick}>undo</button>
        </div>
    )
}

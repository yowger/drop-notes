import { toast } from "react-toastify"

import FeedbackUndo from "./FeedbackUndo"

import type { IFeedBackUndoProps } from "./FeedbackUndo"

const toastUndo = ({
    message,
    handleCallback,
    toastProps,
}: IFeedBackUndoProps) => {
    return toast(
        <FeedbackUndo message={message} handleCallback={handleCallback} />,
        { ...toastProps }
    )
}

export { toastUndo }

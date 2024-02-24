import { toast } from "react-toastify"

import FeedBackUndo from "./FeedbackUndo"

import type { IFeedBackUndoProps } from "./FeedbackUndo"

const toastUndo = ({
    message,
    handleCallback,
    toastProps,
}: IFeedBackUndoProps) => {
    return toast(
        <FeedBackUndo message={message} handleCallback={handleCallback} />,
        { ...toastProps }
    )
}

export { toastUndo }

import { IconX } from "@tabler/icons-react"

interface ICloseButton {
    closeToast: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function CloseButton({ closeToast }: ICloseButton) {
    return (
        <button onClick={closeToast} className="my-auto">
            <IconX className="hover:bg-slate-900/25 rounded-full p-0.5" />
        </button>
    )
}

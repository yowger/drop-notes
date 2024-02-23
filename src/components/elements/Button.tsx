interface IButtonProps {
    handleClick: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
}

export default function Button({ handleClick, children }: IButtonProps) {
    return (
        <button
            onClick={handleClick}
            className="border rounded px-4 py-2 text-sm"
        >
            {children}
        </button>
    )
}

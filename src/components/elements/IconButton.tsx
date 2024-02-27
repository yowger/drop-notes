import Button from "./Button"
import { twMerge } from "tailwind-merge"

import type { IButtonProps } from "./Button"

interface IIconButton extends IButtonProps {
    className?: string
    children: React.ReactNode
}

export default function IconButton({
    className,
    children,
    ...otherProps
}: IIconButton) {
    return (
        <Button
            roundness="full"
            className={twMerge(
                "p-2",
                className
            )}
            {...otherProps}
        >
            {children}
        </Button>
    )
}

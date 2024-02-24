import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { ButtonHTMLAttributes } from "react"

type TButtonVariant = "primary" | "ghost" | "outline"
type TButtonSize = "small" | "normal" | "large"

const buttonStyles = {
    base: "rounded text-slate-900 focus:outline-none transition ease-in-out duration-300",
    size: {
        small: "px-4 py-2 text-sm",
        normal: "px-5 py-2 text-base",
        large: "px-8 py-3 text-lg",
    },
    variant: {
        primary:
            "bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        ghost: "focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50",
        outline:
            "border border-neutral-400 hover:bg-neutral-50  focus:ring-2 focus:ring-neutral-300 focus:ring-opacity-50",
    },
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: TButtonVariant
    size?: TButtonSize

    children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {
            variant = "ghost",
            size = "small",
            className,
            children,
            ...otherProps
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    buttonStyles.base,
                    buttonStyles.size[size],
                    buttonStyles.variant[variant],
                    className
                )}
                {...otherProps}
            >
                {children}
            </button>
        )
    }
)

export default Button

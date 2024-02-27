import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { ButtonHTMLAttributes } from "react"

type TButtonVariant = "primary" | "danger" | "ghost" | "outline"
type TButtonSize = "small" | "normal" | "large"
type TButtonRoundness = "normal" | "full"

const buttonStyles = {
    base: "text-slate-900 focus:outline-none transition ease-in-out duration-300 font-medium overflow-hidden",
    size: {
        small: "px-4 py-2 text-sm",
        normal: "px-5 py-2 text-base",
        large: "px-8 py-3 text-lg",
    },
    roundness: {
        normal: "rounded",
        full: "rounded-full",
    },
    variant: {
        primary:
            "bg-blue-500 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-500 focus:ring-opacity-50",
        ghost: "text-slate-600 hover:bg-slate-100 focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50",
        outline:
            "border border-neutral-400 hover:bg-neutral-50  focus:ring-2 focus:ring-neutral-300 focus:ring-opacity-50",
    },
}

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: TButtonVariant
    size?: TButtonSize
    roundness?: TButtonRoundness
    children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {
            variant = "ghost",
            size = "small",
            roundness = "normal",
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
                    buttonStyles.roundness[roundness],
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

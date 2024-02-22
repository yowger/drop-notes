import { motion } from "framer-motion"

interface BackgroundProps {
    handleClick: React.MouseEventHandler<HTMLDivElement>
}

export default function Background({ handleClick }: BackgroundProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClick}
            className="z-[9] h-screen w-screen fixed bg-slate-900/25 top-0 left-0"
        />
    )
}

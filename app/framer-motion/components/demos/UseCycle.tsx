import { motion, useCycle } from "framer-motion";

export default function UseCycleDemo() {
    const variants = {
        closed: { scale: 1 },
        open: { scale: 1.5, rotate: 180 },
    };
    const [isOpen, cycle] = useCycle(false, true);
    return (
        <motion.div
            variants={variants}
            animate={isOpen ? "open" : "closed"}
            onClick={() => cycle()}
            className="w-20 h-20 bg-green-500 rounded flex items-center justify-center text-white cursor-pointer"
        >
            <p className="font-mono text-sm">
                Click
            </p>
        </motion.div>
    );
}

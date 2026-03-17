import { useState } from 'react'
import {motion} from 'framer-motion'

export default function LayoutPositionDemo() {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="w-full h-full relative">
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                    layout="position"
                    animate={{ y: expanded ? 100 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 absolute h-16 rounded top-1/2 -translate-y-1/2 ${
                        expanded ? "w-32" : "w-20"
                    } bg-yellow-400`}
                    onClick={() => setExpanded(!expanded)}
                />
            </div>
        </div>
    );
}
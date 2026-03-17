import {useRef} from 'react'
import {useMotionValue, useMotionValueEvent, motion} from 'framer-motion'

export default function MotionValueEventDemo() {
    const x = useMotionValue(0);
    const position = useMotionValue(0);
    const containerRef = useRef(null);
    useMotionValueEvent(x, "change", (latest) => {
        position.set(latest);
    });
    return (
        <div
            className="w-full h-full overflow-hidden justify-center flex items-center"
            ref={containerRef}
        >
            <motion.div
                drag="x"
                style={{ x }}
                dragConstraints={containerRef}
                className="w-14 h-14 bg-pink-400 rounded"
            />
        </div>
    );
}
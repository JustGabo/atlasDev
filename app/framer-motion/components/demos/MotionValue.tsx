import {useRef} from 'react'
import {useMotionValue, motion} from 'framer-motion'


export default function MotionValuesDemo() {
    const x = useMotionValue(0);
    const constraintsRef = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={constraintsRef}
            className="w-full h-full flex items-center justify-center overflow-hidden relative"
        >
            <motion.div
                drag="x"
                dragConstraints={constraintsRef}
                style={{ x }}
                className="w-20 h-20 bg-green-300 rounded"
            />
        </div>
    );
}
import {useState} from 'react'
import {motion} from 'framer-motion'

export default function DynamicVariantsDemo() {
    const [custom, setCustom] = useState(0);
    const variants = {
        open: (c: number) => ({ x: c * 40, transition: { duration: 0.5 } }),
        closed: { x: 0 },
    };
    return (
        <div className="flex flex-col w-full h-full overflow-hidden items-center justify-center gap-5">
            <motion.div
                variants={variants}
                animate="open"
                custom={custom}
                className="w-16 h-16 bg-purple-400 rounded"
            />
            <input
                type="range"
                min="-5"
                max="5"
                value={custom}
                onChange={(e) => setCustom(Number(e.target.value))}
            />
        </div>
    );
}
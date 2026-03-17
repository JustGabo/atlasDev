import { motion } from "framer-motion";
import { useState } from "react";

export default function TransformDemo() {
    const [useTransform, setUseTransform] = useState(true);
    return (
        <div className="flex flex-col justify-center w-full items-center gap-5">
            <motion.div
                animate={
                    useTransform
                        ? { x: -100, scale: 1.2 } // transform (GPU friendly)
                        : { left: 100, width: 200 } // layout (reflow)
                }
                transition={{ duration: 0.5 }}
                style={{backgroundColor: "#fff68d"}}
                className="w-24 h-24  relative bg-[#fff68d]"
            />

            <button onClick={() => setUseTransform(!useTransform)}>
                <p className="font-mono border border-neutral-400 px-3 py-1.5 rounded text-sm">
                    Toggle
                </p>
            </button>
        </div>
    );
}

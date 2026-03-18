import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

export default function AnimatePresenceDemo() {
    const [items, setItems] = useState([{ id: 1, text: "Item 1" }]);
    const add = () =>
        setItems([...items, {
            id: Date.now(),
            text: `Item ${items.length + 1}`,
        }]);
    const remove = () => setItems(items.slice(1));

    return (
        <LayoutGroup>
            <div className="h-full relative flex items-center ">
                <div className="flex gap-2 justify-center absolute top-10  left-1/2 -translate-x-1/2">
                    <button
                        onClick={add}
                        className="px-2 py-1 text-green-500 bg-green-100 rounded text-sm"
                    >
                        Add
                    </button>
                    <button
                        onClick={remove}
                        className="px-2 py-1 bg-red-100 text-red-500 rounded text-sm"
                    >
                        Remove
                    </button>
                </div>
                <motion.div className="flex items-center gap-1">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                            layout
                                key={item.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="p-2 w-24 h-16 flex items-center justify-center border bg-fuchsia-100 border-fuchsia-200 text-fuchsia-400 bg-blue- rounded-lg text-sm"
                            >
                                {item.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </LayoutGroup>
    );
}

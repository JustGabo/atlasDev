import {
    ArrowLeft,
    Github,
    Info,
    Linkedin,
    Mail,
    SendHorizonal,
    Twitter,
    User,
    X,
} from "lucide-react";
import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

export default function LayoutIdDemo() {
    const [state, setState] = useState("initial");

    return (
        <LayoutGroup>
            <main className="w-full h-full flex flex-col gap-5  relative  items-center justify-center">
                {state === "initial" && (
                    <motion.div
                        layoutId="card"
                        className={` opacity-100 w-[50%] flex items-center gap-2 p-2 rounded-[24px] bg-[#151417] text-white`}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex w-full items-center gap-2"
                        >
                            <div className="rounded-full lg:h-8 flex items-center justify-center lg:w-8 h-11 w-11 bg-blue-300 relative overflow-hidden border border-neutral-600">
                                <User
                                    className="text-blue-600 w-5 h-5"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className="lg:text-[10px] text-xs font-medium">
                                Alexander McQueen
                            </h3>
                            <div className="flex items-center gap-2 flex-1  justify-end">
                                <div
                                    onClick={() => {
                                        setState("info");
                                    }}
                                    className="rounded-full flex items-center justify-center lg:h-8 lg:w-8 w-11 h-11 hover:bg-[#FF9901]/90 bg-[#FF9901] transition-all duration-200 cursor-pointer"
                                >
                                    <Info
                                        className="lg:w-4 lg:h-4 w-6 h-6 text-white"
                                        strokeWidth={1.7}
                                    />
                                </div>
                                <div
                                    onClick={() => {
                                        setState("social");
                                    }}
                                    className="rounded-full flex items-center justify-center lg:h-8 lg:w-8 h-11 w-11 cursor-pointer transition-all duration-200 hover:bg-[#FF00C0]/90 bg-[#FF00C0]"
                                >
                                    <SendHorizonal
                                        className="w-4 h-4 text-white"
                                        strokeWidth={1.7}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {state === "info" && (
                    <motion.div
                        layoutId="card"
                        onClick={() => {
                            setState("initial");
                        }}
                        className="lg:w-[55%] w-[90%] h-36 rounded-[24px] bg-[#151417] text-white p-3 flex items-center justify-center"
                    >
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.3,
                            }}
                            className={`opacity-100 overflow-hidden   text-[11px] text-neutral-400`}
                        >
                            Lorem ipsum dolor sit, amet{" "}
                            <span className="text-white font-medium">
                                consectetur
                            </span>{" "}
                            adipisicing elit. Dicta, culpa voluptatibus laborum
                            obcaecati accusamus temporibus eligendi vero,
                            numquam, ipsum nobis quam quibusdam adipisci minus
                            quasi. Suscipit dolorum,{" "}
                            <span className="text-white font-medium">
                                {" "}fuga accusamus
                            </span>{" "}
                            iste nihil laboriosam distinctio magni.
                        </motion.p>
                    </motion.div>
                )}

                {state === "social" && (
                    <motion.div
                        layoutId="card"
                        className={`lg:w-[57%] w-full h-12 bg-[#151417] text-white rounded-[24px] flex items-center justify-around gap-1`}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.3,
                            }}
                            className="flex w-full h-full items-center justify-around"
                        >
                            <div
                                onClick={() => {
                                    setState("initial");
                                }}
                                className="w-[20%]  cursor-pointer  hover:text-neutral-400 transition-all duration-200  flex items-center justify-center"
                            >
                                <ArrowLeft className="w-4 h-4  " />
                            </div>
                            <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
                                <Mail className="w-4 h-4  " />
                            </div>
                            <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
                                <Github className="w-4 h-4  " />
                            </div>
                            <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
                                <Linkedin className="w-4 h-4  " />
                            </div>
                            <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
                                <Twitter className="w-4 h-4  " />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </LayoutGroup>
    );
}

// import { useState } from "react";
// import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

// export default function LayoutIdDemo() {
//     const [flipped, setFlipped] = useState(false);
//     return (
//         <LayoutGroup>
//             <div className="flex w-full h-full items-center justify-center gap-16">
//                 <p className="absolute top-5 font-semibold left-1/2 -translate-x-1/2">
//                     Click the shape
//                 </p>
//                 {!flipped && (
//                     <AnimatePresence>
//                         <motion.div className="flex relative items-start h-[50%] w-full justify-center">
//                             <motion.div
//                                 transition={{
//                                     duration: 0.4,
//                                     ease: "easeOut",
//                                 }}
//                                 animate={{
//                                     top: "40px",
//                                 }}
//                                 exit={{
//                                     top: "20px"
//                                 }}
//                                 layoutId="card1"
//                                 style={{ top: "40px", zIndex: 50 }}
//                                 className="w-40  h-20 rounded-xl bg-purple-400 absolute cursor-pointer"
//                                 onClick={() => setFlipped(true)}
//                             />

//                             <motion.div
//                                 transition={{
//                                     duration: 0.4,
//                                     ease: "easeOut",
//                                 }}
//                                 initial={{}}
//                                 animate={{
//                                     y: "20px",
//                                 }}
//                                 exit={{
//                                     y: "-20px"
//                                 }}
//                                 layoutId="card2"
//                                 style={{ y: "20px" }}
//                                 className="w-40 h-20 rounded-xl bg-sky-400 cursor-pointer"
//                                 onClick={() => setFlipped(true)}
//                             />
//                         </motion.div>
//                     </AnimatePresence>
//                 )}
//                 {flipped && (
//                     <motion.div
//                         onClick={() => setFlipped(false)}
//                         initial={{
//                             opacity: 0,
//                         }}
//                         animate={{
//                             opacity: 1,
//                         }}
//                         style={{
//                             padding: "15px 10px 20px 10px ",
//                             backgroundColor: "#000",
//                             borderRadius: "20px",
//                         }}
//                         className="flex relative  justify-center"
//                     >
//                         <motion.div
//                             transition={{
//                                 duration: 0.4,
//                                 ease: "easeOut",
//                             }}
//                             layoutId="card1"
//                             style={{ top: "20px", zIndex: 50 }}
//                             className="w-32 h-20 rounded-xl bg-purple-400 absolute cursor-pointer"
//                             onClick={() => setFlipped(false)}
//                         />

//                         <motion.div
//                             transition={{
//                                 duration: 0.4,
//                                 ease: "easeOut",
//                             }}
//                             layoutId="card2"
//                             style={{ y: "-5px" }}
//                             className="w-32 h-20 rounded-xl bg-sky-400 cursor-pointer"
//                             onClick={() => setFlipped(false)}
//                         />

//                         <div
//                             style={{
//                                 height: "65%",
//                                 backgroundColor: "#000",
//                                 zIndex: 50,
//                                 borderRadius: " 0px 0px 15px 15px",
//                             }}
//                             className="absolute bottom-0  w-full"
//                         >
//                             <div
//                                 style={{
//                                     justifyContent: "end",
//                                     paddingLeft: "11px",
//                                 }}
//                                 className="w-full h-full   flex flex-col relative"
//                             >
//                                 <div
//                                     style={{
//                                         backgroundColor: "#000",
//                                         zIndex: 50,
//                                         borderRadius: "10px",
//                                         top: "-10px",
//                                         height: "25%",
//                                     }}
//                                     className="w-[50%] left-1/2 -translate-x-1/2 absolute"
//                                 />
//                                 <p className="text-white bg-neutral- text-sm">
//                                     $200,000
//                                 </p>
//                                 <p
//                                     style={{ color: "#a1a1a1" }}
//                                     className=" mb-3 text-xs"
//                                 >
//                                     Balance
//                                 </p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>
//         </LayoutGroup>
//     );
// }

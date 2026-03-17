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
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LayoutGroup, motion, motionValue } from "framer-motion";

const Interaction = () => {
    const [state, setState] = useState("initial");
    // const [showInitial, setShowInitial] = useState(true);
    // const [showText, setShowText] = useState(false);
    // const [showSocial, setShowSocial] = useState(false);
    // const [hasChanged, setHasChanged] = useState(false);
    // const state = motionValue("initial")

    return (
        <main className="w-full h-full flex flex-col gap-5  relative  items-center justify-center">
            <LayoutGroup>
                {state === "initial" && (
                    <motion.div
                        layoutId="card"
                        className={` opacity-100 w-[50%] flex items-center gap-2 p-2 rounded-[24px] bg-[#151417] text-white`}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.4,
                            }}
                            className="flex w-full items-center gap-2"
                        >
                            <div className="rounded-full lg:h-8 flex items-center justify-center lg:w-8 h-11 w-11 bg-blue-300 relative overflow-hidden border border-neutral-600">
                                <User className="text-blue-600 w-5 h-5" strokeWidth={1.5}/>
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
            </LayoutGroup>
        </main>
    );
};

export default Interaction;

//   import {
//     ArrowLeft,
//     Github,
//     Info,
//     Linkedin,
//     Mail,
//     SendHorizonal,
//     Twitter,
//     X,
//   } from "lucide-react";
//   import Image from "next/image";
//   import React, { useEffect, useState } from "react";
//   import {motion, motionValue} from 'framer-motion'

//   const Interaction = () => {
//     const [state, setState] = useState("initial");
//     const [showInitial, setShowInitial] = useState(true);
//     const [showText, setShowText] = useState(false);
//     const [showSocial, setShowSocial] = useState(false);
//     const [hasChanged, setHasChanged] = useState(false)
//     const status = motionValue("initial")

//     return (
//     <main className="w-full h-full flex flex-col gap-5  relative  items-center justify-center">
//       {/* <p className={`${hasChanged ? "opacity-0" : "opacity-100" } text-xs  transition-all duration-200 font-medium absolute bottom-0 right-1`}>Try it.</p> */}
//         <div
//         style={{ borderRadius: state !== "info" ? "48px" : "24px" }}
//         className={`${state === "initial" && "lg:w-[47%] w-[93%]  lg:h-12 h-16"}  ${
//           state === "social" && "lg:w-[57%] w-full h-12"
//         } ${
//           state === "info" && "lg:w-[55%] w-[90x%] h-52"
//         }     flex items-center transition-all duration-500  p-2 gap-2 bg-[#a244ff] text-white `}
//       >
//         {state === "initial" && (
//           <div
//             className={`${
//               showInitial && "opacity-100"
//             } opacity-0 transition-all duration-300 w-full flex items-center gap-2`}
//           >
//             <div className="rounded-full lg:h-8 lg:w-8 h-11 w-11 bg-neutral-600 relative overflow-hidden border border-neutral-600">
//               <Image
//                 src={"/ProfileFoto.jpg"}
//                 alt="Picture"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <h3 className="lg:text-[10px] text-xs font-medium">Alexander McQueen</h3>
//             <div className="flex items-center gap-2 flex-1  justify-end">
//               <div
//                 onClick={() => {
//                   setState("info");
//                   setHasChanged(true)
//                   setTimeout(() => {
//                     setShowText(true);
//                     setShowInitial(false);
//                   }, 350);
//                 }}
//                 className="rounded-full flex items-center justify-center lg:h-8 lg:w-8 w-11 h-11 hover:bg-[#FF9901]/90 bg-[#FF9901] transition-all duration-200 cursor-pointer"
//               >
//                 <Info className="lg:w-4 lg:h-4 w-6 h-6 text-white" strokeWidth={1.7} />
//               </div>
//               <div
//                 onClick={() => {
//                   setState("social");
//                   setHasChanged(true)
//                   setTimeout(() => {
//                     setShowSocial(true);
//                     setShowInitial(false);
//                   }, 250);
//                 }}
//                 className="rounded-full flex items-center justify-center lg:h-8 lg:w-8 h-11 w-11 cursor-pointer transition-all duration-200 hover:bg-[#FF00C0]/90 bg-[#FF00C0]"
//               >
//                 <SendHorizonal className="w-4 h-4 text-white" strokeWidth={1.7} />
//               </div>
//             </div>
//           </div>
//         )}

//         {state === "info" && (
//           <div
//             onClick={() => {
//               setState("initial");
//               setHasChanged(true)
//               setTimeout(() => {
//                 setShowText(false);
//                 setShowInitial(true);
//               }, 350);
//             }}
//             className="w-full h-full p-3 flex items-center justify-center"
//           >
//             <p
//               className={`${
//                 showText && "opacity-100"
//               } opacity-0 overflow-hidden transition-all duration-300  text-[11px] text-neutral-400`}
//             >
//               Lorem ipsum dolor sit, amet{" "}
//               <span className="text-white font-medium">consectetur</span>{" "}
//               adipisicing elit. Dicta, culpa voluptatibus laborum obcaecati
//               accusamus temporibus eligendi vero, numquam, ipsum nobis quam
//               quibusdam adipisci minus quasi. Suscipit dolorum,{" "}
//               <span className="text-white font-medium">{" "}fuga accusamus</span> iste
//               nihil laboriosam distinctio magni, temporibus blanditiis corporis
//               nisi officiis velit rerum.
//               <span className="text-white font-medium">{" "}Odio beatae</span> labore
//               eveniet, cupiditate reprehenderit dolorum.
//             </p>
//           </div>
//         )}

//         {state === "social" && (
//           <div
//             className={`${
//               showSocial && "opacity-100"
//             } w-full opacity-0 transition-all duration-200 h-full flex items-center justify-around gap-1`}
//           >
//             <div
//               onClick={() => {
//                 setState("initial");
//                 setHasChanged(true)
//                 setTimeout(() => {
//                   setShowSocial(false);
//                   setShowInitial(true);
//                 }, 350);
//               }}
//               className="w-[20%]  cursor-pointer  hover:text-neutral-400 transition-all duration-200  flex items-center justify-center"
//             >
//               <ArrowLeft className="w-4 h-4  " />
//             </div>
//             <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
//               <Mail className="w-4 h-4  " />
//             </div>
//             <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
//               <Github className="w-4 h-4  " />
//             </div>
//             <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
//               <Linkedin className="w-4 h-4  " />
//             </div>
//             <div className="w-[20%]  cursor-pointer hover:text-neutral-400  flex items-center justify-center  transition-all duration-200">
//               <Twitter className="w-4 h-4  " />
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//     );
//   };

//   export default Interaction;

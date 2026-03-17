import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTime,
  useTransform,
} from "framer-motion";

import Porteria from "../porteria";
import Kicker from "../kicker";
import KickerBefore from "../kickerBefore";
import { useState } from "react";

export default function UseTimeDemo() {
  const time = useTime();

  const cycle = useTransform(time, (t) => t % 1300);

  const [kickerStatus, setKickerStatus] = useState("gettingReady");

  useMotionValueEvent(cycle, "change", (t) => {
    setKickerStatus((prev) => {
      if (t < 100 && prev !== "gettingReady") return "gettingReady";
      if (t >= 100 && t < 1000 && prev !== "kicking") return "kicking";
      return prev;
    });
  });

  const x = useTransform(cycle, [175, 1300], [0, 300], {
    clamp: true,
  });

  return (
    <div className="w-full h-full relative flex justify-end items-end">
      {
        /* <div className="h-[50%] w-[20%] absolute bottom-0 left-20">
          <AnimatePresence mode="wait">
            {kickerStatus === "gettingReady" ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: -4 }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <KickerBefore />
              </motion.div>
            ) : (
              <motion.div
                key="kick"
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <Kicker />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          style={{ transform: "rotate(-12deg)" }}
          className="w-[60%] absolute bottom-10 right-[10%] h-[12.5px] bg-[#FFDAAF rounded-[30px]"
        >
          <motion.div
            style={{
              x,
              position: "relative",
              bottom: "20px",
              zIndex: 50,
            }}
            className="w-7 h-7 rounded-full bg-blue-400"
          />
        </div>

        <div
          style={{ zIndex: 10 }}
          className="w-auto h-[70%] px-5 flex justify-end relative"
        >
          <Porteria className="z-10 w-full h-full" />
        </div> */
      }
      <GrowingPerson />
    </div>
  );
}

// import { motion, useTime, useTransform } from "framer-motion"

export function GrowingPerson() {
  const time = useTime();

  const loop = useTransform(time, (t) => t % 12000);

  const scaleY = useTransform(loop, [0, 12000], [0.3, 1]);

  const age = useTransform(loop, [0, 12000], [3, 25]);
  const ageRounded = useTransform(age, (v) => `${Math.round(v)}yo`);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
      className="w-full h-full"
    >
      <motion.div style={{ fontSize: "24px", fontWeight: 600 }}>
        <motion.p className="tabular-nums font-mono text-sm">
          {ageRounded}
        </motion.p>
      </motion.div>

      <div className="h-[60%] w-[20%] relative">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 226 482"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            scaleY,
            transformOrigin: "bottom",
          }}
        >
          <path
            d="M15.5 267.5H24.0587C32.3429 267.5 39.0587 260.784 39.0587 252.5V211V162.921C39.0587 158.27 42.8288 154.5 47.4795 154.5C52.1302 154.5 55.9004 158.27 55.9004 162.921V466C55.9004 474.284 62.6161 481 70.9004 481H85.6639C93.9481 481 100.664 474.284 100.664 466V404V339.668C100.664 332.672 106.336 327 113.332 327C120.328 327 126 332.672 126 339.668V411.5V466C126 474.284 132.716 481 141 481H155.5C163.784 481 170.5 474.284 170.5 466V327V163.999C170.5 158.753 174.753 154.5 179.999 154.5C185.245 154.5 189.498 158.753 189.498 163.999V261.5C189.498 269.784 196.214 276.5 204.498 276.5H210.5C218.784 276.5 225.5 269.784 225.5 261.5V190.25V119C225.5 110.716 218.784 104 210.5 104H15.5C7.21573 104 0.5 110.716 0.5 119V252.5C0.5 260.784 7.21572 267.5 15.5 267.5Z"
            fill="#E8E8E8"
            // stroke="black"
          />
          <circle cx="113" cy="44.5" r="44.5" fill="#E8E8E8" />
        </motion.svg>
      </div>

      {
        /* <motion.svg
        width="140"
        height="260"
        viewBox="0 0 64 128"
        style={{
          // scaleY,
          transformOrigin: "bottom",
        }}
      >
        <path
          fill="black"
          d="
          M32 8
          a8 8 0 1 1 0 16
          a8 8 0 1 1 0-16

          M20 28
          Q16 28 16 34
          L16 70
          Q16 76 20 76
          L22 76
          L22 110
          Q22 116 26 116
          L30 116
          Q34 116 34 110
          L34 80
          L38 80
          L38 110
          Q38 116 42 116
          L46 116
          Q50 116 50 110
          L50 76
          L52 76
          Q56 76 56 70
          L56 34
          Q56 28 52 28
          Q48 28 48 34
          L48 68
          L44 68
          L44 34
          Q44 28 40 28
          Z
          "
        />
      </motion.svg> */
      }
    </div>
  );
}

// import { motion, useTime, useTransform, useMotionValueEvent } from "framer-motion";
// import Porteria from "../porteria";
// import Kicker from "../kicker";
// import KickerBefore from "../kickerBefore";
// import { useState } from "react";

// export default function UseTimeDemo() {
//     const time = useTime();

//     // ciclo completo de 4 segundos que se repite
//     const cycle = useTransform(time, (t) => t % 1300);

//     const [kickerStatus, setKickerStatus] = useState("gettingReady");

//     // escuchar el tiempo del ciclo para cambiar el estado del jugador
//     useMotionValueEvent(cycle, "change", (t) => {
//         if (t < 150) {
//             setKickerStatus("gettingReady");
//         } else if (t < 1000) {
//             setKickerStatus("kicking");
//         }
//     });

//     // la bola solo se mueve durante la patada
//     const x = useTransform(cycle, [150, 1300], [0, 300], {
//         clamp: true,
//     });

//     return (
//         <div className="w-full h-full relative flex justify-end items-end">

//             {/* Jugador */}
//             <div className="h-[50%] w-[20%] absolute bottom-0 left-20">
//                 {kickerStatus === "gettingReady" ? (
//                     <motion.div className="w-full h-full">
//                         <KickerBefore />
//                     </motion.div>
//                 ) : (
//                     <motion.div className="w-full h-full">
//                         <Kicker />
//                     </motion.div>
//                 )}
//             </div>

//             {/* Suelo */}
//             <div
//                 style={{ transform: "rotate(-12deg)" }}
//                 className="w-[60%] absolute bottom-10 right-[10%] h-[12.5px] bg-[#FFDAAF rounded-[30px]"
//             >
//                 {/* Bola */}
//                 <motion.div
//                     style={{
//                         x,
//                         position: "relative",
//                         bottom: "20px",
//                         zIndex: 50,
//                     }}
//                     className="w-7 h-7 rounded-full bg-blue-400"
//                 />
//             </div>

//             {/* Portería */}
//             <div
//                 style={{ zIndex: 10 }}
//                 className="w-auto h-[70%] px-5 flex justify-end relative"
//             >
//                 <Porteria className="z-10 w-full h-full" />
//             </div>

//         </div>
//     );
// }

// import { motion, useTime, useTransform } from "framer-motion";
// import Porteria from "../porteria";
// import Kicker from "../kicker";
// import { useEffect, useState } from "react";
// import KickerBefore from "../kickerBefore";

// export default function UseTimeDemo() {
//     const time = useTime();
//     const [kickerStatus, setKickerStatus] = useState("gettingReady");
//     const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
//     // const x = useTransform(time, [0, 10000], [0, 100])
//     const x = useTransform(time, (t) => (t / 7) % 300);

//     // useEffect(() => {
//     //     const id = setInterval(() => {
//     //         console.log("gettingReady");
//     //     }, );

//     //     return () => {
//     //         clearInterval(id);
//     //     };
//     // }, []);

//     useEffect(() => {
//         let timer: NodeJS.Timeout;

//         if (kickerStatus === "gettingReady") {
//             // después de 0.5s cambia al segundo
//             timer = setTimeout(() => {
//                 setKickerStatus("kicking");
//                 console.log("setting to Kicking");
//             }, 500);
//         }

//         if (kickerStatus === "kicking") {
//             // el segundo dura 4s
//             timer = setTimeout(() => {
//                 setKickerStatus("gettingReady");
//                 console.log("setting to gettingReady");
//             }, 1200);
//         }

//         return () => clearTimeout(timer);
//     }, [kickerStatus]);

//     return (
//         <div // style={{
//          //     transform: "rotate(-15deg)"
//         // }}
//         className="w-full h-full relative flex justify-end items-end" // className="w-[200px] h-[12.5px] bg-[#FFDAAF] rounded-[30px]"
//         >
//             <div className="h-[50%] w-[20%]  absolute bottom-0 left-20">
//                 {kickerStatus === "gettingReady"
//                     ? (
//                         <motion.div className="w-full h-full" layoutId="">
//                             <KickerBefore />
//                         </motion.div>
//                     )
//                     : (
//                         <motion.div className="w-full h-full">
//                             <Kicker />
//                         </motion.div>
//                     )}
//             </div>
//             <div
//                 style={{
//                     transform: "rotate(-12deg)",
//                 }}
//                 className="w-[60%] absolute bottom-10 right-[10%] h-[12.5px] bg-[#FFDAAF rounded-[30px]"
//             >
//                 <motion.div
//                     style={{
//                         x,
//                         position: "relative",
//                         bottom: "20px",
//                         zIndex: 50,
//                     }}
//                     className="w-7 h-7 rounded-full  bg-blue-400"
//                 />
//             </div>

//             <div
//                 style={{ zIndex: 10 }}
//                 className="w-auto h-[70%] px-5 flex justify-end relative"
//             >
//                 <Porteria className="z-10 w-full h-full" />
//             </div>

//             {
//                 /* <motion.div
//                 style={{ rotate }}
//                 className="w-16 h-16 bg-blue-500 rounded"
//             /> */
//             }
//         </div>
//     );
// }

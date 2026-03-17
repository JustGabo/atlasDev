import { motion } from "framer-motion";

export default function WhileHoverDemo() {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            style={{
                padding: "15px 10px 20px 10px ",
                backgroundColor: "#000",
                borderRadius: "20px",
            }}
            className="flex relative  justify-center"
        >
            <motion.div
                whileHover={{ top: "-35px", rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.1,
                }}
                layoutId="card1"
                style={{ top: "25px", zIndex: 50, padding: "0px 10px" }}
                className="w-32 h-20 rounded-xl bg-purple-400 absolute cursor-pointer"
            >
                <div className="relative w-full h-full">
                    <p
                        style={{ textAlign: "right", marginTop: "5px" }}
                        className="text-xs w-full tracking-wide"
                    >
                        Credit
                    </p>

                    <p
                        style={{
                            marginTop: "auto",
                            bottom: 10,
                            // color: "white",
                            fontSize: "11px",
                        }}
                        className="text-xs w-full absolute tracking-wide"
                    >
                        $50,000
                    </p>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: "-70px", rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.1,
                }}
                style={{ y: "-5px", padding: "0px 10px" }}
                className="w-32 h-20  rounded-xl relative bg-blue-500  cursor-pointer"
            >
                <p
                    style={{
                        textAlign: "right",
                        marginTop: "5px",
                        color: "white",
                        fontSize: "11px",
                    }}
                    className=" w-full font-medium"
                >
                    Paypal
                </p>

                <p
                    style={{
                        marginTop: "auto",
                        bottom: 5,
                        color: "white",
                        fontSize: "11px",
                    }}
                    className="text-xs w-full absolute"
                >
                    $150,000
                </p>
            </motion.div>

            <div
                style={{
                    height: "60%",
                    backgroundColor: "#000",
                    zIndex: 50,
                    borderRadius: " 0px 0px 15px 15px",
                }}
                className="absolute bottom-0  w-full"
            >
                <div
                    style={{
                        justifyContent: "end",
                        paddingLeft: "11px",
                    }}
                    className="w-full h-full   flex flex-col relative"
                >
                    <div
                        style={{
                            backgroundColor: "#000",
                            zIndex: 50,
                            borderRadius: "10px",
                            top: "-7px",
                            height: "25%",
                        }}
                        className="w-[50%] left-1/2 -translate-x-1/2 absolute"
                    />
                    <p className="text-white bg-neutral- text-sm">
                        $200,000
                    </p>
                    <p
                        style={{ color: "#a1a1a1" }}
                        className=" mb-3 text-xs"
                    >
                        Balance
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

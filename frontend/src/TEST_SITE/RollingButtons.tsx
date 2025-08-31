import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Delete, Shuffle, Play, BetweenVerticalStart, Scissors, ArrowRight, ArrowLeft } from "lucide-react";

export default function RollingButtons() {
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div className="w-[95%] lg:h-[120px] h-[15%] flex items-center rounded mb-3
             border-black justify-end border">
            <div className="flex h-full flex-grow justify-end">

                <AnimatePresence>
                    {showButtons && (
                        <motion.div
                            key="toolbar"
                            initial={{ x: 300, rotate: 0, opacity: 0 }}
                            animate={{ x: 0, rotate: 0, opacity: 1 }}
                            exit={{ x: 500, rotate: 0, opacity: 0 }}
                            transition={{ duration: 0.4, }}
                            className="flex h-full w-full "
                        >
                            <div className="lg:w-[35%] w-[45%] h-full ">

                                {/*Add Pop New (buttons)*/}
                                <div className="w-full h-1/2 border-r  flex justify-center items-center">


                                    <div className="w-[90%] gap-1 h-[70%]  flex justify-center items-center">

                                        <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer hover:scale-105 duration-150 
                             active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">

                                            <Plus className="" />
                                            Add

                                        </button>

                                        <button className="w-[33%] border lg:h-full h-[80%]  rounded cursor-pointer hover:scale-105 duration-150 
                            active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">

                                            <Delete className="" />
                                            Pop

                                        </button>

                                        <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer hover:scale-105 duration-150
                             active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">

                                            <Shuffle />
                                            New

                                        </button>
                                    </div>



                                </div>

                                {/*Animate button*/}
                                <div className="w-full h-1/2 border-t border-r flex items-center justify-center">
                                    <button className="border text-[18px] lg:text-3xl p-1 rounded cursor-pointer hover:scale-105 duration-150
                    active:scale-100 flex items-center ">
                                        <Play />
                                        Animate
                                    </button>

                                </div>


                            </div>



                            {/*Insert and Remove buttons*/}
                            <div className="lg:w-[60%] w-[55%] border  h-full flex flex-col items-center">

                                <div className="w-full h-1/2 flex p-1 items-center ">

                                    <button className="border text-[0px] p-1 rounded cursor-pointer hover:scale-105
                        duration-150 lg:text-[24px] flex items-center justify-center">
                                        <BetweenVerticalStart />
                                        Insert
                                    </button>


                                    <label htmlFor="value" className="w-[12%] overflow-x-hidden lg:ml-2">Value</label>
                                    <input type="number" className="w-[22%] ml-1 border-b"
                                        name="value" />

                                    <label htmlFor="index" className="w-[12%] overflow-x-hidden lg:ml-2">
                                        Index
                                    </label>

                                    <input type="number" className="w-[22%] ml-1 border-b"
                                        name="index" min={0} />


                                </div>

                                <div className="w-full h-1/2 border-t flex p-1 items-center">

                                    <button className="border text-[0px] p-1 rounded cursor-pointer hover:scale-105
                        duration-150 lg:text-[24px] flex items-center justify-center">
                                        <Scissors />
                                        Remove
                                    </button>


                                    <label htmlFor="index" className="ml-2">index</label>
                                    <input type="number" className="w-[25%] ml-1 border-b"
                                        name="index" min={0} />



                                </div>
                            </div>
                        </motion.div>)
                    }
                </AnimatePresence>


                <div className="lg:w-[5%] w-[10%] border h-full flex items-center justify-center cursor-pointer"
                    onClick={() => setShowButtons(!showButtons)}>
                    {
                        showButtons ? <ArrowRight className="size-[24px]" /> : <ArrowLeft className="size-[24px]" />
                    }

                </div>

            </div>



        </div >
    );
}




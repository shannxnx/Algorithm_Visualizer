
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BetweenVerticalStart, Delete, Play, Plus, Scissors, Shuffle } from "lucide-react";
import React from "react";
import type { rectInfo } from "../../INTERFACES && TYPES/sortInterface";




type BinaryButtonProps = {

    actions?: {
        size: (val: number) => void,
        search: (data: rectInfo) => void,
        testSearch?: (val: number) => void
        create?: () => void,
        start: () => void



    },
    states?: {
        isAnimating: string,
        searchValue: number,
        sizeValue: number

    }
}


function BinaryButton({ actions, states }: BinaryButtonProps) {


    const val = states?.searchValue;




    return <div className="lg:w-[95%] w-full lg:h-[120px] h-[15%] lg:mt-0 mt-5 
    flex items-center rounded mb-3 border-black  dark:border-black">
        <div className="h-full w-full flex items-center justify-center">

            <AnimatePresence>

                <motion.div
                    key="toolbar"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 500, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full lg:w-[50%] w-[90%] justify-start border rounded p-1 flex-col dark:border-black"
                >
                    <div className="w-full h-1/2 flex gap-2 items-center  ">
                        <button className="btn btn-lg sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl
                    border-black h-[80%] dark:border-black text-black bg-white dark:bg-white" onClick={actions?.create}>
                            Create
                        </button>
                        <label htmlFor="create" className="lg:text-[20px] text-black ">Size</label>
                        <input type="number" className="w-[20%] p-1 border-b dark:border-b-black dark:text-black" min={1} max={15}
                            name="create" value={states?.sizeValue} onChange={(e) => actions?.size(Number(e.target.value))} />
                    </div>

                    <div className="w-full lg:h-1/2 flex gap-2 items-center ">
                        <button className="btn btn-lg sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl
                    border-black lg:h-[80%] text-black bg-white dark:bg-white" onClick={actions?.start}>
                            Starts
                        </button>
                        <label htmlFor="find" className="lg:text-[20px] text-black dark:text-black">Search number</label>
                        <input type="number" className="w-[20%] p-1 border-b dark:border-b-black dark:text-black"
                            name="create" value={states?.searchValue} onChange={(e) => actions?.testSearch!(Number(e.target.value))} />

                    </div>



                </motion.div>

            </AnimatePresence>



        </div>
    </div>

}



export default React.memo(BinaryButton);
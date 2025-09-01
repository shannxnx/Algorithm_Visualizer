import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BetweenVerticalStart, Delete, Play, Plus, Scissors, Shuffle } from "lucide-react";




type ButtonV1Props = {
    showButton: {
        value: boolean,
        action: (val: boolean) => void
    };
    actions?: {
        add: () => void,
        pop: () => void,
        new: () => void,
        insert: () => void,
        remove: () => void,
        animate?: () => void,

        setInsertValue?: (val: number) => void,
        setIndexValue?: (val: number) => void,
        setRemoveIndex?: (val: number) => void,


    },
    states?: {
        isAnimating: boolean,
        insertValue: number,
        insertIndex: number,
        removeIndex: number,

    }
}


export default function ButtonV1({ showButton }: ButtonV1Props) {





    return <div className="w-[95%] lg:h-[120px] h-[15%] flex items-center rounded mb-3 border-black border">
        <div className="h-full w-full flex justify-end">

            <AnimatePresence>
                {showButton.value && (
                    <motion.div
                        key="toolbar"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 500, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-full lg:w-[95%] w-[90%] justify-start "
                    >

                        {/* (Add / Pop / New + Animate) */}
                        <div className="lg:w-[40%] w-[45%] h-full">
                            {/* Add / Pop / New */}
                            <div className="w-full h-1/2 border-r flex justify-center items-center">
                                <div className="w-[90%] gap-1 h-[70%] flex justify-center items-center">
                                    <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer hover:scale-105 duration-150 active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">
                                        <Plus /> Add
                                    </button>

                                    <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer hover:scale-105 duration-150 active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">
                                        <Delete /> Pop
                                    </button>

                                    <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer hover:scale-105 duration-150 active:scale-100 text-[0px] lg:text-[16px] flex justify-center items-center">
                                        <Shuffle /> New
                                    </button>
                                </div>
                            </div>

                            {/* Animate Button */}
                            <div className="w-full h-1/2 border-t border-r flex items-center justify-center">
                                <button className="border text-[18px] lg:text-3xl p-1 rounded cursor-pointer hover:scale-105 duration-150 active:scale-100 flex items-center">
                                    <Play /> Animate
                                </button>
                            </div>
                        </div>

                        {/*(Insert and Remove buttons) */}
                        <div className="lg:w-[60%] w-[55%] h-full flex flex-col items-center">
                            {/* Insert */}
                            <div className="w-full h-1/2 flex p-1 items-center">
                                <button className="border text-[0px] p-1 rounded cursor-pointer hover:scale-105 duration-150 lg:text-[24px] flex items-center justify-center">
                                    <BetweenVerticalStart /> Insert
                                </button>
                                <label htmlFor="value" className="w-[12%] overflow-x-hidden lg:ml-2">Value</label>
                                <input type="number" className="w-[22%] ml-1 border-b" name="value" />
                                <label htmlFor="index" className="w-[12%] overflow-x-hidden lg:ml-2">Index</label>
                                <input type="number" className="w-[22%] ml-1 border-b" name="index" min={0} />
                            </div>

                            {/* Remove button */}
                            <div className="w-full h-1/2 border-t flex p-1 items-center">
                                <button className="border text-[0px] p-1 rounded cursor-pointer hover:scale-105 duration-150 lg:text-[24px] flex items-center justify-center">
                                    <Scissors /> Remove
                                </button>
                                <label htmlFor="indexR" className="ml-2">index</label>
                                <input type="number" className="w-[25%] ml-1 border-b" name="indexR" min={0} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <button
                className="lg:w-[5%] w-[10%] border-l h-full flex items-center justify-center cursor-pointer"
                onClick={() => showButton.action(!showButton.value)}
            >
                {showButton.value ? <ArrowRight /> : <ArrowLeft />}
            </button>
        </div>
    </div>

}
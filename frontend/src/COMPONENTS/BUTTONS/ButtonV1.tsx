import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BetweenVerticalStart, Delete, Play, Plus, Scissors, Shuffle } from "lucide-react";
import React from "react";
import type { rectInfo } from "../../INTERFACES && TYPES/sortInterface";




type ButtonV1Props = {
    showButton: {
        value: boolean,
        action: (val: boolean) => void
    };
    actions?: {
        add: () => void,
        pop?: () => void,
        new?: () => void,
        insert?: () => void,
        remove?: () => void,
        animate?: () => void,

        animateForBubbleSort?: () => void,

        setInsertValue?: (val: number) => void,
        setIndexValue?: (val: number) => void,
        setRemoveIndex?: (val: number) => void,




    },
    states?: {
        isAnimating: string,
        insertValue: number,
        insertIndex: number,
        removeIndex: number,
        arrayLength: number,

    }
}


function ButtonV1({ showButton, actions, states }: ButtonV1Props) {


    //console.log("Array length (ButtonV1): ", states?.arrayLength);


    return <div className="w-[95%] lg:h-[120px] h-[15%] flex items-center rounded mb-3 border-black border dark:border-black">
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
                        <div className="lg:w-[40%] w-[45%] h-full dark:border-black" >
                            {/* Add / Pop / New */}
                            <div className="w-full h-1/2 border-r flex justify-center items-center dark:border-black">
                                <div className="w-[90%] gap-1 h-[70%] flex justify-center items-center dark:border-black">

                                    <button className={`w-[33%] border lg:h-full h-[80%] rounded cursor-pointer 
                                    hover:scale-105 duration-150 active:scale-100 text-[0px] lg:text-[16px] 
                                    flex justify-center items-center 
                                    ${states?.isAnimating === 'done' ||
                                            states?.isAnimating === 'animating'
                                            ? "dark:text-gray-300 text-gray-300"
                                            : "dark:text-black text-black"}`
                                    }

                                        disabled={
                                            states?.isAnimating === "animating" ||
                                                states?.isAnimating === "done" ? true : false
                                        }
                                        onClick={actions?.add}
                                    >
                                        <Plus /> Add

                                    </button>

                                    <button className={`w-[33%] border 
                                    lg:h-full h-[80%] rounded cursor-pointer 
                                    hover:scale-105 duration-150 active:scale-100 text-[0px] 
                                    lg:text-[16px] flex justify-center items-center 
                                    ${states?.isAnimating === 'done' ||
                                            states?.isAnimating === 'animating'
                                            ? "dark:text-gray-300 text-gray-300"
                                            : "dark:text-black text-black"}
                                    `}
                                        onClick={actions?.pop}
                                        disabled={
                                            states?.isAnimating === "animating" ||
                                                states?.isAnimating === "done" ? true : false
                                        }
                                    >
                                        <Delete /> Pop
                                    </button>

                                    <button className={`w-[33%] border lg:h-full 
                                    h-[80%] rounded cursor-pointer hover:scale-105 
                                    duration-150 active:scale-100 text-[0px] lg:text-[16px] 
                                    flex justify-center items-center  dark:text-black
                                    ${states?.isAnimating === 'animating'
                                            ? "dark:text-gray-300 text-gray-300"
                                            : "dark:text-black text-black"}
                                     `}
                                        onClick={actions?.new}
                                        disabled={
                                            states?.isAnimating === "animating"
                                        }>
                                        <Shuffle /> New
                                    </button>
                                </div>
                            </div>

                            {/* Animate Button */}
                            <div className="w-full h-1/2 border-t border-r flex items-center justify-center dark:border-black">
                                <button className={`border text-[18px] lg:text-3xl p-1 rounded cursor-pointer 
                                hover:scale-105 duration-150 active:scale-100 flex  items-center
                                ${states?.isAnimating === 'done' ||
                                        states?.isAnimating === 'animating'
                                        ? "dark:text-gray-300 text-gray-300"
                                        : "dark:text-black text-black"}`
                                }


                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    }
                                    onClick={actions?.animate || actions?.animateForBubbleSort}>
                                    <Play /> Animate
                                </button>
                            </div>
                        </div>

                        {/*(Insert and Remove buttons) */}
                        <div className="lg:w-[60%] w-[55%] h-full flex flex-col items-center dark:border-black">
                            {/* Insert */}
                            <div className="w-full h-1/2 flex p-1 items-center">
                                <button className={`border text-[0px] p-1 rounded 
                                cursor-pointer hover:scale-105 duration-150 lg:text-[24px] 
                                flex items-center justify-center
                                ${states?.isAnimating === 'done' ||
                                        states?.isAnimating === 'animating'
                                        ? "dark:text-gray-300 text-gray-300"
                                        : "dark:text-black text-black"}
                                `}

                                    onClick={actions?.insert}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    }>

                                    <BetweenVerticalStart /> Insert

                                </button>
                                <label htmlFor="value" className="w-[12%] overflow-x-hidden lg:ml-2 dark:text-black"
                                >
                                    Value
                                </label>
                                <input type="number" className="w-[22%] ml-1 border-b dark:text-black
                                  "
                                    name="value"
                                    max={999}
                                    value={states?.insertValue}
                                    onChange={(val) => actions?.setInsertValue!(Number(val.target.value))}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    } />



                                <label htmlFor="index" className="w-[12%] overflow-x-hidden lg:ml-2 dark:text-black">
                                    Index
                                </label>

                                <input type="number" className="w-[22%] ml-1 border-b dark:text-black" name="index"
                                    min={0}
                                    max={states?.arrayLength! - 1}
                                    value={states?.insertIndex}
                                    onChange={(val) => actions?.setIndexValue!(Number(val.target.value))}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    } />


                            </div>

                            {/* Remove button */}
                            <div className="w-full h-1/2 border-t flex p-1 items-center dark:border-black">
                                <button className={`border text-[0px] p-1 rounded cursor-pointer hover:scale-105 
                                duration-150 lg:text-[24px] flex 
                                ${states?.isAnimating === 'done' ||
                                        states?.isAnimating === 'animating'
                                        ? "dark:text-gray-300 text-gray-300"
                                        : "dark:text-black text-black"}                                                                
                                items-center justify-center`}
                                    onClick={actions?.remove}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    }>
                                    <Scissors /> Remove
                                </button>

                                <label htmlFor="indexR" className="ml-2 dark:text-black" >index</label>

                                <input type="number" className="w-[25%] ml-1 border-b dark:text-black dark:border-black" name="indexR"
                                    min={0}
                                    max={states?.arrayLength! - 1}
                                    value={states?.removeIndex}
                                    onChange={(val) => actions?.setRemoveIndex!(Number(val.target.value))}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    } />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <button
                className="lg:w-[5%] w-[10%] border-l h-full flex items-center justify-center cursor-pointer dark:border-black dark:text-black"
                onClick={() => showButton.action(!showButton.value)}
            >
                {showButton.value ? <ArrowRight /> : <ArrowLeft />}
            </button>
        </div>
    </div>

}



export default React.memo(ButtonV1);
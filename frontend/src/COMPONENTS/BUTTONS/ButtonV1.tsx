import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BetweenVerticalStart, Delete, Play, Plus, Scissors, Shuffle } from "lucide-react";
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


export default function ButtonV1({ showButton, actions, states }: ButtonV1Props) {


    //console.log("Array length (ButtonV1): ", states?.arrayLength);


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

                                    <button className="w-[33%] border lg:h-full h-[80%] rounded cursor-pointer 
                                    hover:scale-105 duration-150 active:scale-100 text-[0px] lg:text-[16px] 
                                    flex justify-center items-center"
                                        disabled={
                                            states?.isAnimating === "animating" ||
                                                states?.isAnimating === "done" ? true : false
                                        }
                                        onClick={actions?.add}>
                                        <Plus /> Add
                                    </button>

                                    <button className="w-[33%] border 
                                    lg:h-full h-[80%] rounded cursor-pointer 
                                    hover:scale-105 duration-150 active:scale-100 text-[0px] 
                                    lg:text-[16px] flex justify-center items-center"
                                        onClick={actions?.pop}
                                        disabled={
                                            states?.isAnimating === "animating" ||
                                                states?.isAnimating === "done" ? true : false
                                        }
                                    >
                                        <Delete /> Pop
                                    </button>

                                    <button className="w-[33%] border lg:h-full 
                                    h-[80%] rounded cursor-pointer hover:scale-105 
                                    duration-150 active:scale-100 text-[0px] lg:text-[16px] 
                                    flex justify-center items-center"
                                        onClick={actions?.new}
                                        disabled={
                                            states?.isAnimating === "animating"
                                        }>
                                        <Shuffle /> New
                                    </button>
                                </div>
                            </div>

                            {/* Animate Button */}
                            <div className="w-full h-1/2 border-t border-r flex items-center justify-center">
                                <button className="border text-[18px] lg:text-3xl p-1 rounded cursor-pointer 
                                hover:scale-105 duration-150 active:scale-100 flex 
                                items-center"
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
                        <div className="lg:w-[60%] w-[55%] h-full flex flex-col items-center">
                            {/* Insert */}
                            <div className="w-full h-1/2 flex p-1 items-center">
                                <button className="border text-[0px] p-1 rounded 
                                cursor-pointer hover:scale-105 duration-150 lg:text-[24px] 
                                flex items-center justify-center"
                                    onClick={actions?.insert}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    }>

                                    <BetweenVerticalStart /> Insert

                                </button>
                                <label htmlFor="value" className="w-[12%] overflow-x-hidden lg:ml-2"
                                >
                                    Value
                                </label>
                                <input type="number" className="w-[22%] ml-1 border-b" name="value"
                                    max={999}
                                    value={states?.insertValue}
                                    onChange={(val) => actions?.setInsertValue!(Number(val.target.value))}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    } />



                                <label htmlFor="index" className="w-[12%] overflow-x-hidden lg:ml-2">
                                    Index
                                </label>

                                <input type="number" className="w-[22%] ml-1 border-b" name="index"
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
                            <div className="w-full h-1/2 border-t flex p-1 items-center">
                                <button className="border text-[0px] p-1 rounded cursor-pointer hover:scale-105 
                                duration-150 lg:text-[24px] flex 
                                items-center justify-center"
                                    onClick={actions?.remove}
                                    disabled={
                                        states?.isAnimating === "animating" ||
                                            states?.isAnimating === "done" ? true : false
                                    }>
                                    <Scissors /> Remove
                                </button>

                                <label htmlFor="indexR" className="ml-2" >index</label>

                                <input type="number" className="w-[25%] ml-1 border-b" name="indexR"
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
                className="lg:w-[5%] w-[10%] border-l h-full flex items-center justify-center cursor-pointer"
                onClick={() => showButton.action(!showButton.value)}
            >
                {showButton.value ? <ArrowRight /> : <ArrowLeft />}
            </button>
        </div>
    </div>

}






//<div className="w-[95%] lg:h-[120px] h-[15%] flex items-center justify-around mb-3 border-black ">
//
//                <div className="w-[35%] h-full border-1 flex flex-col border-black">
//
//                    <div className="w-full h-1/2 flex justify-around items-center border-b-1 border-black">
//
//                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
//                        cursor-pointer hover:scale-105 duration-150 text-black"
//                            disabled={isAnimating === "animating" || isAnimating === "done" ? true : false}
//                            onClick={handleAdd}
//                        >
//                            Add
//                        </button>
//
//                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
//                        cursor-pointer hover:scale-105 duration-150 text-black"
//                            disabled={isAnimating === "animating" || isAnimating === "done" ? true : false}
//                            onClick={handlePop}
//                        >
//                            Pop
//                        </button>
//
//                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
//                        cursor-pointer hover:scale-105 duration-150 text-black"
//                            disabled={isAnimating === "animating" ? true : false}
//                            onClick={handleNewBoxes}
//                        >
//                            New
//                        </button>
//
//                    </div>
//
//
//                    <div className="w-full h-[50%] flex items-center justify-center">
//                        <button className="text-3xl border-1 w-[130px] rounded bg-green-400
//                        disabled:opacity-50 cursor-pointer hover:scale-105 duration-150 text-black"
//                            onClick={() => setIsAnimating("animating")}
//                            disabled={isAnimating === "animating" || isAnimating === "done" ? true : false}>
//                            Animate
//                        </button>
//                    </div>
//                </div>
//
//
//                <div className="w-[440px] h-full  border-black
//                        flex items-center justify-end cursor-pointer gap-2 bg-white">
//
//                    <div className="w-[90%] h-full border-1 flex flex-col items-center
//                            justify-center gap-2 border-black">
//
//                        <div className="w-[80%] h-[40%] flex items-center">
//
//                            <button className="text-2xl h-full border-1 p-1 rounded hover:scale-105 duration-100 cursor-pointer
//                            bg-green-400 disabled:opacity-50 text-black "
//                                disabled={isAnimating === "animating" || isAnimating === "done" ? true : false}
//                                onClick={handleInsert}
//                            >
//                                Insert
//                            </button>
//                            <label htmlFor="value" className="ml-1 text-black">Value</label>
//
//                            <input type="number" name="value" className="border-1 w-[54px] ml-3 text-[16px] p-1
//                            outline-none text-black"
//                                max={999}
//                                value={insertVal}
//                                onChange={(e) => setInsertVal(Number(e.target.value))}
//                                disabled={isAnimating === "animating" ? true : false} />
//
//
//                            <label htmlFor="index" className="ml-1 text-black">Index</label>
//                            <input type="number" name="index"
//                                className="border-1 w-[54px] text-[16px] ml-2 p-1
//                            outline-none text-black "
//                                min={0}
//                                disabled={isAnimating === "animating" ? true : false}
//                                value={insertIndex}
//                                onChange={(e) => setInsertIndex(Number(e.target.value))}
//                                max={rectsArray.length - 1}
//                            />
//
//
//                        </div>
//
//                        <div className="w-[80%] h-[40%]  items-center flex">
//                            <button className="text-2xl h-full border-1 p-1 rounded hover:scale-105 duration-100 cursor-pointer
//                            bg-red-500 disabled:opacity-50 text-black"
//                                disabled={isAnimating === "animating" || isAnimating === "done" ? true : false}
//                                onClick={handleRemoveIndex}
//                        >
//                                Remove
//                            </button>
//                            <label htmlFor="indexR" className="ml-1 text-black">Index</label>
//
//                            <input type="number" className="border-1 w-[54px] ml-3 text-[16px] p-1
//                                    outline-none text-black"
//                                min={0}
//                                max={rectsArray.length - 1}
//                                value={removeIndex}
//                                onChange={(e) => setRemoveIndex(Number(e.target.value))}
//                                name="indexR"
//                                disabled={isAnimating === "animating" ? true : false}
//                            />
//
//                        </div>
//                    </div>
//
//                    <button className="w-[10%] h-full border-1 flex justify-center items-center border-black">
//                        <ArrowLeft color="black" />
//                    </button>
//
//                </div>
//
//            </div>
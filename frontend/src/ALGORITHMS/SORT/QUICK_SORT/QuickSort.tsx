import { useEffect } from "react";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES/sortInterface";
import { ArrowLeft, BetweenVerticalEnd, BetweenVerticalStart, Delete, Play, Plus, Scissors, Shuffle } from "lucide-react";


export default function QuickSort() {

    const quickSortInfo = sortStore((state: any) => state.quickSortInfo);
    const getQuickSort = sortStore((state: any) => state.getQuickSort);
    const editSortCode = sortStore((state: any) => state.editSortCode);


    useEffect(() => {
        getQuickSort();
    }, []);

    const QuickPayload: SortKit = {
        algoName: quickSortInfo.algoName,
        algoInfo: quickSortInfo.algoInfo,
        codes: quickSortInfo.codes,
        editAlgoInfo: editSortCode

    };





    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] lg:h-[75%] h-[85%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">
                NIGGA
            </div>



            <div className="w-[95%] lg:h-[120px] h-[15%] flex items-center  rounded mb-3
             border-black justify-start border">

                <div className="lg:w-[35%] w-[35%]  h-full">

                    {/*Add Pop New (buttons)*/}
                    <div className="w-full h-1/2 border-r flex justify-center items-center">


                        <div className="w-[90%] gap-1 h-[70%] flex justify-center items-center">

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
                <div className="lg:w-[60%] w-[55%]  h-full flex flex-col items-center">

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



                <div className="lg:w-[5%] w-[10%] border-l h-full flex items-center justify-center cursor-pointer">
                    <ArrowLeft />
                </div>

            </div>



        </div >


        <AlgoInfo algoInfo={QuickPayload} />






    </main >
}
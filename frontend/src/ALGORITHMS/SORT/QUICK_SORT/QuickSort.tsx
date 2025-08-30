import { useEffect } from "react";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES/sortInterface";


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

            </div>



            <div className="w-[95%] lg:h-[120px] h-[15%] flex items-center lg:justify-around justify-center rounded mb-3 border-black border">

                <div className="w-[35%] h-full border-1 flex flex-col border-black">

                    <div className="w-full h-1/2 flex justify-around items-center border-b-1 border-black">

                        <button className="lg:text-2xl border-1  lg:h-[36px] lg:w-[64px] disabled:opacity-50 lg:rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"

                        >
                            Add
                        </button>

                        <button className="lg:text-2xl border-1  lg:h-[36px] lg:w-[64px] disabled:opacity-50 lg:rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"

                        >
                            Pop
                        </button>

                        <button className="lg:text-2xl border-1  lg:h-[36px] lg:w-[64px] disabled:opacity-50 lg:rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"

                        >
                            New
                        </button>

                    </div>


                    <div className="w-full h-[50%] flex items-center justify-center">
                        <button className="lg:text-3xl border-1 lg:w-[130px] rounded bg-green-400
                        disabled:opacity-50 cursor-pointer hover:scale-105 duration-150 text-black"
                        >
                            Animate
                        </button>
                    </div>
                </div>


                <div className="w-[60%] h-full  border-black
                        flex items-center justify-end cursor-pointer gap-2 bg-white">

                    <div className="w-[90%] h-full border-1 flex flex-col items-center
                            justify-center gap-2 border-black">

                        <div className="w-[80%] h-[40%] flex items-center">

                            <button className="lg:text-2xl lg:h-full border-1
                             p-1 rounded hover:scale-105 duration-100 cursor-pointer
                            bg-green-400 disabled:opacity-50 text-black "

                            >
                                Insert
                            </button>
                            <label htmlFor="value" className="ml-1 text-black">Value</label>

                            <input type="number" name="value" className="border-1 lg:w-[54px] ml-3 text-[16px] p-1
                            outline-none text-black w-[20px]"
                            />


                            <label htmlFor="index" className="ml-1 text-black">Index</label>
                            <input type="number" name="index"
                                className="border-1 lg:w-[54px] lg:text-[16px] ml-2 p-1
                            outline-none text-black w-[20px] "

                            />


                        </div>

                        <div className="w-[80%] h-[40%]  items-center flex">
                            <button className="lg:text-2xl lg:h-full border-1 p-1 
                            rounded hover:scale-105 duration-100 cursor-pointer
                            bg-red-500 disabled:opacity-50 text-black"

                            >
                                Remove
                            </button>
                            <label htmlFor="indexR" className="ml-1 text-black">Index</label>

                            <input type="number" className="border-1 w-[54px] ml-3 text-[16px] p-1
                                    outline-none text-black"

                            />

                        </div>
                    </div>


                </div>

            </div>




        </div >


        <AlgoInfo algoInfo={QuickPayload} />






    </main >
}
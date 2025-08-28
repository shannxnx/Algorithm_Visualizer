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


        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] h-[75%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">

            </div>



            <div className="w-[95%] h-[120px] flex items-center justify-around mb-3 border-black border">



            </div>




        </div>


        <AlgoInfo algoInfo={QuickPayload} />






    </main>
}
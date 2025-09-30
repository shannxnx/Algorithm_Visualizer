import { useEffect } from "react";
import { searchStore } from "../../../STATE/searchStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";


export default function BinarySearch() {

    const getBinarySearch = searchStore((state: any) => state.getBinarySearch);
    const binarySearchInfo = searchStore((state: any) => state.BinarySearchInfo);
    const editSortCode = searchStore((state: any) => state.editSortCode);


    useEffect(() => {

        getBinarySearch();

    }, []);

    console.log("Binary Search Info: ", binarySearchInfo);

    const BinaryPayload: SortKit = {
        algoInfo: binarySearchInfo.algoInfo,
        algoName: binarySearchInfo.algoName,
        codes: binarySearchInfo.codes,
        editAlgoInfo: editSortCode
    };


    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] h-[75%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">

            </div>


            {/*<ButtonV1 showButton={showButtonProps} actions={actionsProps} states={stateProps} />*/}


        </div>

        <AlgoInfo algoInfo={BinaryPayload} />


    </main>
}

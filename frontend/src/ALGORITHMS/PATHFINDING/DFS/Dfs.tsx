import { useEffect } from "react";
import { pathFindingStore } from "../../../STATE/pathfindingStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";


export default function DepthFirstSearch() {

    const getDFSInfo = pathFindingStore((state) => state.getDFSInfo);
    const depthFirstSearch = pathFindingStore((state) => state.DepthFirstSearch);
    const editPathFindingCode = pathFindingStore((state) => state.editPathfindingCode);


    useEffect(() => {
        getDFSInfo();
    });


    const dfsPayload: SortKit = {
        algoInfo: depthFirstSearch.algoInfo,
        algoName: depthFirstSearch.algoName,
        codes: depthFirstSearch.codes,
        editAlgoInfo: editPathFindingCode
    }

    return <main className="w-screen h-screen flex  gap-5 overflow-x-hidden p-2 bg-black">
        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center" >



            <div className="w-[95%] h-[95%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black" style={{ scrollbarGutter: "stable" }}>

                {
                    //rectsArray.length > 0 ? <TernarySearchKonva props={TernaryKonvaPayload} />
                    //    : null
                }
            </div>





        </div>

        <AlgoInfo algoInfo={dfsPayload} />

    </main>
}
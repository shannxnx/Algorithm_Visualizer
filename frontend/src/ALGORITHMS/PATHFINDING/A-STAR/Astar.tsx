import { useEffect } from "react";
import { pathFindingStore } from "../../../STATE/pathfindingStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import AStarKonva from "./AstarKonva";
import { Square } from "lucide-react";
import PathfindingGuide from "../../../COMPONENTS/INFO_CONTENT/PathfindingGuide";


export default function Astar() {

    const getAStarInfo = pathFindingStore((state: any) => state.getAStar);
    const AStarInfo = pathFindingStore((state: any) => state.AStar);
    const editPathFindingCode = pathFindingStore((state: any) => state.editPathfindingCode);


    useEffect(() => {
        getAStarInfo();
    }, []);


    const AStarPayload: SortKit = {
        algoInfo: AStarInfo.algoInfo,
        algoName: AStarInfo.algoName,
        codes: AStarInfo.codes,
        editAlgoInfo: editPathFindingCode
    };


    return <main className="w-screen h-screen flex  gap-5 overflow-x-hidden p-2 bg-black">
        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center" >


            <div className="lg:w-[95%] lg:h-[80%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black" style={{ scrollbarGutter: "stable" }}>

                <AStarKonva />

            </div>

            <PathfindingGuide />



        </div>

        <AlgoInfo algoInfo={AStarPayload} />

    </main>
}
import { useEffect } from "react";
import { pathFindingStore } from "../../../STATE/pathfindingStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import BfsKonva from "./BfsKonva";
import { Square } from "lucide-react";
import PathfindingGuide from "../../../COMPONENTS/INFO_CONTENT/PathfindingGuide";
import useMeasure from "react-use-measure";



export default function BreadthFirstSearch() {

    const getBFSInfo = pathFindingStore((state: any) => state.getBFSInfo);
    const breadthFirstSearch = pathFindingStore((state: any) => state.BreadthFirstSearch);
    const editPathFindingCode = pathFindingStore((state: any) => state.editPathfindingCode);
    const [ref, bounds] = useMeasure();


    useEffect(() => {
        getBFSInfo();
    }, []);


    const bfsPayload: SortKit = {
        algoInfo: breadthFirstSearch.algoInfo,
        algoName: breadthFirstSearch.algoName,
        codes: breadthFirstSearch.codes,
        editAlgoInfo: editPathFindingCode
    };


    console.log("BFS: ", breadthFirstSearch);

    return <main className="w-screen h-screen flex  gap-5 overflow-x-hidden p-2 bg-black">
        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center" ref={ref}>


            <div className="lg:w-[95%] lg:h-[80%] h-[80%] w-[95%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black" style={{ scrollbarGutter: "stable" }}>

                <BfsKonva bounds={bounds} />

            </div>


            <PathfindingGuide />




        </div>

        <AlgoInfo algoInfo={bfsPayload} />

    </main>
}
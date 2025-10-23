import { useEffect } from "react";
import { pathFindingStore } from "../../../STATE/pathfindingStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import DfsKonva from "./DfsKonva";
import { RectangleCircle, Square } from "lucide-react";
import PathfindingGuide from "../../../COMPONENTS/INFO_CONTENT/PathfindingGuide";
import useMeasure from "react-use-measure";


export default function DepthFirstSearch() {

    const getDFSInfo = pathFindingStore((state: any) => state.getDFSInfo);
    const depthFirstSearch = pathFindingStore((state: any) => state.DepthFirstSearch);
    const editPathFindingCode = pathFindingStore((state: any) => state.editPathfindingCode);

    const [ref, bounds] = useMeasure();


    useEffect(() => {
        getDFSInfo();
    }, []);


    const dfsPayload: SortKit = {
        algoInfo: depthFirstSearch.algoInfo,
        algoName: depthFirstSearch.algoName,
        codes: depthFirstSearch.codes,
        editAlgoInfo: editPathFindingCode
    }

    return <main className="w-screen h-screen flex  gap-5 overflow-x-hidden p-2 bg-black">
        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center" ref={ref}>



            <div className="lg:w-[95%] lg:h-[80%] h-[80%] w-[95%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black" style={{ scrollbarGutter: "stable" }}>


                <DfsKonva bounds={bounds} />

            </div>


            <PathfindingGuide />




        </div>

        <AlgoInfo algoInfo={dfsPayload} />

    </main>
}
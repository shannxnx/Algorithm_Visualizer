import { useEffect } from "react";
import { pathFindingStore } from "../../../STATE/pathfindingStore"
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import AStarKonva from "./AstarKonva";
import { Square } from "lucide-react";



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

            <div className="lg:h-[10%] border-b  lg:w-[95%] rounded
            flex justify-center items-center">
                <ul className="h-full w-full flex justify-around items-center ">
                    <li className="flex gap-1">
                        Click+W = Wall <span><Square color="black" className="bg-black rounded" /></span>
                    </li>

                    <li className="flex gap-1">
                        Click+S = Start <span><Square color="green" className="bg-green-700 rounded" /></span>
                    </li>

                    <li className="flex gap-1">
                        Click+E = End <span><Square color="red" className="bg-red-500 rounded" /></span>
                    </li>

                    <li className="flex gap-1">
                        Click+R = Reset

                    </li>

                    <li className="flex gap-1">
                        Click+V = Visualize
                    </li>
                </ul>

            </div>



        </div>

        <AlgoInfo algoInfo={AStarPayload} />

    </main>
}
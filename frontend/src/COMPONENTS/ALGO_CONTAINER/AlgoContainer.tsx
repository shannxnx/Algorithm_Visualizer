import type React from "react";
import AlgoCard from "../CARDS/AlgoCard";
import { algoStore } from "../../STATE/algoStore";
import { sortingArray, searchingArray, graphAlgoArray, backtrackingArray } from "../../LIB/algoDummyDB";
import { authStore } from "../../STATE/authStore";




type Props = { myRef: React.RefObject<HTMLDivElement | null> };



export default function AlgoContainer({ myRef }: Props) {


    const setAlgoCategory = algoStore((state: any) => state.setAlgoCategory);
    const algoCategory = algoStore((state: any) => state.algoCategory);
    const currentArray = algoStore((state: any) => state.currentArray);
    const setCurrentArray = algoStore((state: any) => state.setCurrentArray);

    const Admin = authStore((state: any) => state.Admin);


    console.log("Algo category : ", algoCategory);
    console.log("Current Array : ", currentArray)



    const handleCategory = (cat: string, array: Array<Object>) => {
        setAlgoCategory(cat); setCurrentArray(array);
    }




    return <div className={`w-screen overflow-x-hidden flex flex-col justify-center items-center 
    ${Admin ? "bg-red-600" : "bg-[#2DFF65]"}`} style={{ scrollbarWidth: "none" }}

        ref={myRef}>


        <select
            defaultValue="Algorithm Category"
            className="select select-primary outline-none active:outline-none ml-4 mt-3 focus:outline-0
             cursor-pointer dark:bg-white dark:text-black border-black z-10 border 
             "
            onChange={(e) => {
                const value = e.target.value;
                if (value === "sorting") handleCategory("sorting", sortingArray);
                if (value === "searching") handleCategory("searching", searchingArray);
                if (value === "path_finding") handleCategory("path_finding", graphAlgoArray);
                if (value === "back_tracking") handleCategory("back_tracking", backtrackingArray);
            }}
        >
            <option disabled>Algorithm Category</option>
            <option value="sorting" className="dark:text-black rounded">Sorting</option>
            <option value="searching" className="dark:text-black">Searching</option>
            <option value="path_finding" className="dark:text-black">Pathfinding</option>
            <option value="back_tracking" className="dark:text-black">Backtracking</option>
        </select>



        <h1 className="text-3xl mt-10 mb-10 text-black">ALGORITHMS</h1>

        <div className="w-screen grid lg:grid-cols-3 lg:grid-rows-2 p-4 
        place-items-center gap-y-5 grid-cols-1 grid-rows-4 overflow-x-hidden  border-black"
            style={{ scrollbarWidth: "none" }}>


            {
                currentArray && Array.isArray(currentArray) && currentArray?.map((a: any, id: any) => <AlgoCard key={id} algoName={a.algoInfo.name} algoLink={a.algoInfo.algoLink} />)

            }



        </div>
    </div>


}
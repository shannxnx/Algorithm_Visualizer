import type React from "react";
import AlgoCard from "../CARDS/AlgoCard";
import { algoStore } from "../../STATE/algoStore";
import { sortingArray, searchingArray, graphAlgoArray, backtrackingArray } from "../../LIB/algoDummyDB";




type Props = { myRef: React.RefObject<HTMLDivElement | null> };



export default function AlgoContainer({ myRef }: Props) {


    const setAlgoCategory = algoStore((state: any) => state.setAlgoCategory);
    const algoCategory = algoStore((state: any) => state.algoCategory);
    const currentArray = algoStore((state: any) => state.currentArray);
    const setCurrentArray = algoStore((state: any) => state.setCurrentArray);


    console.log("Algo category : ", algoCategory);
    console.log("Current Array : ", currentArray)



    const handleCategory = (cat: string, array: Array<Object>) => {
        setAlgoCategory(cat); setCurrentArray(array);
    }

    // <option onClick={() => handleCategory('recursion_trees')}>Recursion Trees</option> 
    // <option onClick={() => handleCategory('group_algorithms')}>Group Algorithms</option>


    return <div className="w-screen overflow-x-hidden flex flex-col justify-center items-center 
    "
        ref={myRef}>

        <select defaultValue="Algorithm Category"
            className="select select-primary outline-none  active:outline-none ml-4 mt-3 cursor-pointer ">
            <option disabled={true}>Algorithm Category </option>

            <option onClick={() => handleCategory('sorting', sortingArray)} >Sorting</option>

            <option onClick={() => handleCategory('searching', searchingArray)}>Searching</option>

            <option onClick={() => handleCategory('path_finding', graphAlgoArray)}>Pathfinding</option>

            <option onClick={() => handleCategory('back_traking', backtrackingArray)}>Backtracking</option>


        </select>


        <h1 className="text-3xl mt-10 mb-10">ALGORITHMS</h1>

        <div className="w-screen   grid lg:grid-cols-3 lg:grid-rows-2 p-4 
        place-items-center gap-y-5 grid-cols-1 grid-rows-4 overflow-x-hidden  border-black">


            {
                currentArray && Array.isArray(currentArray) && currentArray?.map((a: any, id: any) => <AlgoCard key={id} algoName={a.algoInfo.name} algoLink={a.algoInfo.algoLink} />)

            }



        </div>
    </div>


}
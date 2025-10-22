import type React from "react";
import AlgoCard from "../CARDS/AlgoCard";
import { algoStore } from "../../STATE/algoStore";
import { sortingArray, searchingArray, graphAlgoArray, backtrackingArray } from "../../LIB/algoDummyDB";
import { authStore } from "../../STATE/authStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AlgoCard2 from "../CARDS/AlgoCard2";



type Props = { myRef: React.RefObject<HTMLDivElement | null> };

//#2DFF65 type of green
//#f6f6f6 type of white

export default function AlgoContainer({ myRef }: Props) {


    const setAlgoCategory = algoStore((state: any) => state.setAlgoCategory);
    const algoCategory = algoStore((state: any) => state.algoCategory);
    const currentArray = algoStore((state: any) => state.currentArray);
    const setCurrentArray = algoStore((state: any) => state.setCurrentArray);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const Admin = authStore((state: any) => state.Admin);






    const handleCategory = (cat: string, array: Array<Object>) => {
        setAlgoCategory(cat);
        setCurrentArray(array);
    };

    useEffect(() => {
        setCurrentArray(sortingArray);
        setTimeout(() => {

            setIsLoading(false);
        }, 1000);

    }, [])

    console.log("Current Array: ", currentArray);


    return <div className={`w-screen overflow-x-hidden flex flex-col justify-center items-center 
    ${Admin ? "bg-red-600" : "bg-[#f6f6f]"}`} style={{ scrollbarWidth: "none" }}
        ref={myRef}>

        {
            isLoading ? <div className="skeleton lg:h-[40px] lg:w-[300px] mt-3 bg-gray-200"></div>
                :
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
                        //if (value === "back_tracking") handleCategory("back_tracking", backtrackingArray);
                    }}
                >
                    <option disabled>Algorithm Category</option>
                    <option value="sorting" className="dark:text-black rounded">Sorting</option>
                    <option value="searching" className="dark:text-black">Searching</option>
                    <option value="path_finding" className="dark:text-black">Pathfinding</option>
                    {/*<option value="back_tracking" className="dark:text-black">Backtracking</option>*/}

                </select>
        }

        {
            isLoading ? <div className="skeleton lg:h-[40px] lg:w-[200px] mt-10 mb-10 bg-gray-200"></div>
                : <h1 className="text-3xl mt-10 mb-10 text-black">ALGORITHMS</h1>
        }


        <motion.div className="w-screen grid lg:grid-cols-3 lg:grid-rows-2 p-4 
        place-items-center  gap-y-10  grid-cols-1 grid-rows-4 overflow-x-hidden "

        >


            {
                currentArray && Array.isArray(currentArray) && currentArray?.map((a: any, id: any) =>
                    <AlgoCard2
                        key={id}
                        algoName={a.algoInfo.name}
                        algoLink={a.algoInfo.algoLink}
                        index={id}
                        algoImg={a.algoInfo.img}
                        isLoading={isLoading}
                        difficulty={a.algoInfo.difficulty}
                        type={a.algoInfo.type}
                        description={a.algoInfo.description}
                        time={a.algoInfo.time}

                    />)

            }




        </motion.div>
    </div>


}
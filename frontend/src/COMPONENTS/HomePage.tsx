import { useRef } from "react";
import Navbar from "./NAVBAR/Navbar";
import HomeCard from "./CARDS/HomeCard";




export default function FrontPage() {

    const visualizeRef = useRef<HTMLDivElement>(null);

    const handleScrollVisualize = () => {
        visualizeRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return <main className="flex  flex-col  min-h-screen w-screen overflow-y-scroll">

        <Navbar onScrollNext={handleScrollVisualize} />
        <HomeCard />

        <div className="w-screen overflow-x-hidden flex flex-col justify-center items-center"
            ref={visualizeRef}>

            <select defaultValue="Algorithm Category"
                className="select select-primary outline-none  active:outline-none ml-4 mt-3 ">
                <option disabled={true}>Algorithm Category </option>
                <option>Sorting</option>
                <option>Searching</option>
                <option>Pathfinding</option>
                <option>Recursion Trees</option>
                <option>Group Algorithms</option>
            </select>

            <div className="w-screen   grid lg:grid-cols-3 lg:grid-rows-2 p-4 lg:mt-15
        place-items-center gap-y-5 grid-cols-1 grid-rows-4 overflow-x-hidden  border-black">

                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>
                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>
                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>
                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>
                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>
                <div className="border border-black w-[85%] h-[400px] rounded-[8px] cursor-pointer"></div>

            </div>
        </div>







    </main>
}
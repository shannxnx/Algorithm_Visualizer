import { useRef } from "react";
import Navbar from "./NAVBAR/Navbar";
import HomeCard from "./CARDS/HomeCard";
import AlgoContainer from "./ALGO_CONTAINER/AlgoContainer";




export default function FrontPage() {

    const visualizeRef = useRef<HTMLDivElement>(null);

    const handleScrollVisualize = () => {
        visualizeRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return <main className="flex  flex-col  min-h-screen w-screen overflow-y-scroll">

        <Navbar onScrollNext={handleScrollVisualize} />
        <HomeCard />
        <AlgoContainer myRef={visualizeRef} />

    </main>
}
import { useRef } from "react";
import Navbar from "./NAVBAR/Navbar";
import HomeCard from "./CARDS/HomeCard";
import AlgoContainer from "./ALGO_CONTAINER/AlgoContainer";
import { authStore } from "../STATE/authStore";




export default function FrontPage() {

    const Admin = authStore((state) => state.Admin);

    const visualizeRef = useRef<HTMLDivElement>(null);

    const handleScrollVisualize = () => {
        visualizeRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return <main className={`flex  flex-col  min-h-screen w-screen overflow-y-scroll ${Admin ? "bg-red-600" : "bg-[#2DFF65]"}`}>

        <Navbar onScrollNext={handleScrollVisualize} />
        <HomeCard />
        <AlgoContainer myRef={visualizeRef} />

    </main>
}
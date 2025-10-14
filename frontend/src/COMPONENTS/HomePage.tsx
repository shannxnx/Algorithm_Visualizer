import { useEffect, useRef } from "react";
import Navbar from "./NAVBAR/Navbar";
import HomeCard from "./CARDS/HomeCard";
import AlgoContainer from "./ALGO_CONTAINER/AlgoContainer";
import { authStore } from "../STATE/authStore";




export default function FrontPage() {

    const Admin = authStore((state) => state.Admin);
    const checkAuth = authStore((state) => state.CheckAuth);

    const visualizeRef = useRef<HTMLDivElement>(null);

    const handleScrollVisualize = () => {
        visualizeRef.current?.scrollIntoView({ behavior: "smooth" })
    };


    useEffect(() => {
        checkAuth();
    }, []);


    return <main className={`flex  flex-col  h-full w-full overflow-y-scroll overflow-x-hidden ${Admin ?
        "bg-red-600" : "bg-[#2DFF65]"} `}
        style={{ scrollbarWidth: "none" }}>

        <Navbar onScrollNext={handleScrollVisualize} />

        <HomeCard />

        <AlgoContainer myRef={visualizeRef} />

    </main>
}
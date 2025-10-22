import { useEffect, useRef } from "react";
import Navbar from "./NAVBAR/Navbar";
import HomeCard from "./CARDS/HomeCard";
import AlgoContainer from "./ALGO_CONTAINER/AlgoContainer";
import { authStore } from "../STATE/authStore";
import { Copyright, Github } from "lucide-react";


//#2DFF65

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
        "bg-red-600" : "bg-white"} `}
        style={{ scrollbarWidth: "none" }}>

        <Navbar onScrollNext={handleScrollVisualize} />

        <HomeCard />

        <AlgoContainer myRef={visualizeRef} />

        <footer className="w-full lg:h-[70px] md:h-[70px] h-[70px] bg-gray-100 flex items-center justify-between mt-20">
            <h1 className="ml-5  flex items-center text-black">
                <Copyright className="" />2025 Shann Lacanaria
            </h1>
        </footer>

    </main>
}
import { useEffect, useRef } from "react"
import { authStore } from "../../STATE/authStore"
import { useNavigate } from "react-router-dom";


type NavbarProps = {
    onScrollNext: () => void
}


export default function Navbar({ onScrollNext }: NavbarProps) {




    const clickCount = authStore((state) => state.clickCount);
    const clickIncrement = authStore((state) => state.clickIncrement);
    const Admin = authStore((state) => state.Admin);

    const navigate = useNavigate();





    console.log("Click Count: ", clickCount);
    useEffect(() => {
        if (clickCount === 13) {
            navigate("/secret/login");
        };
    }, [clickCount, navigate])




    return <nav className="lg:h-[65px] lg:w-full bg-black border-2  flex p-3 justify-center
    dark:border-black" style={{ scrollbarWidth: "none" }}>

        <div className=" dark:border-black lg:w-[15%] flex items-center justify-center">

            <h1 className={`lg:text-4xl text-black LOGO  duration-100 cursor-pointer
                hover:text-black   p-1 rounded-[8px] ${Admin ? "bg-red-600" : "bg-white"}`}
                onClick={() => clickIncrement()}>

                AV

            </h1>

        </div>



        <div className="lg:w-1/2 flex gap-8  justify-center items-center">

            <a onClick={onScrollNext}>
                <h1 className={`${Admin ? "text-red-600" : "text-white"} text-2xl cursor-pointer  duration-150 
               ${Admin ? "hover:text-red-600" : "hover:text-gray-400"} 
            `}>
                    {/* Visualize*}*/}
                    {
                        Admin ? "Hello Admin" : "Visualize"
                    }
                </h1>
            </a>


        </div>

        <div className="lg:w-[15%] flex items-center justify-center ">
            <a>
                <h1 className={`text-4xl text-white
                cursor-pointer  duration-150 ${Admin ? "hover:text-red-600" : "hover:text-gray-400"}`
                }>
                    About
                </h1>
            </a>
        </div>



    </nav>

}
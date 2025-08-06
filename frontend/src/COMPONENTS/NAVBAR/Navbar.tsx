import { useRef } from "react"


type NavbarProps = {
    onScrollNext: () => void
}


export default function Navbar({ onScrollNext }: NavbarProps) {









    return <nav className="lg:h-[65px] lg:w-full bg-black border-2  rounded flex p-3 justify-center">

        <div className="border-1 lg:w-[15%] flex items-center justify-center">
            <h1 className="lg:text-4xl text-white LOGO hover:scale-105 duration-100 cursor-pointer
                hover:text-black   p-1 rounded-[8px] bg-[#26b06d]">
                AV
            </h1>
        </div>

        <div className="lg:w-1/2 flex gap-8 border-red-400 justify-center items-center">

            <a onClick={onScrollNext}>
                <h1 className="text-white text-2xl cursor-pointer hover:scale-110 duration-150 hover:text-green-400
            ">
                    Visualize
                </h1>
            </a>


        </div>

        <div className="lg:w-[15%] border-1  flex items-center justify-center">
            <h1 className="text-4xl text-white
                cursor-pointer hover:scale-110 duration-150 hover:text-green-400">About</h1>
        </div>


    </nav>

}
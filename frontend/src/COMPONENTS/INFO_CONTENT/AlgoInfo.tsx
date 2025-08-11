import { ArrowRight } from "lucide-react"



type props = {
    readonly algoName?: string;
    readonly algoInfo?: string;
    readonly algoCode?: string
}


export default function AlgoInfo({ algoName, algoInfo, algoCode }: props) {
    return <div className="w-[40%] h-full border-1 rounded flex-col flex  items-center bg-white relative">
        <h1 className="text-3xl mt-4">{algoName}</h1>
        <button className="absolute right-0 mt-4 mr-4 cursor-pointer">
            <a href="/"> <ArrowRight size={32} /></a>
        </button>


        <div className="mt-4 border-1 w-[90%] h-[50%] overflow-scroll p-2">
            {algoCode}
        </div>


        <div className="w-[90%] h-[30%] mt-8 border-1 flex items-center p-2 justify-around">
            {algoInfo}

        </div>

    </div>
}
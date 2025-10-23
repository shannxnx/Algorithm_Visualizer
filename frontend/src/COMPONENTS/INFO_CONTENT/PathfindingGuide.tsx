import { Square } from "lucide-react";


export default function PathfindingGuide() {
    return <div className="lg:h-[10%] h-[15%] w-[95%] lg:border-b border lg:w-[95%] rounded
            flex justify-center items-center">
        <ul className="h-full w-full lg:flex lg:justify-around lg:items-center 
        md:flex md:justify-around md:items-center hidden">
            <li className="flex gap-1">
                Click+W = Wall <span><Square color="black" className="bg-black rounded" /></span>
            </li>

            <li className="flex gap-1">
                Click+S = Start <span><Square color="green" className="bg-green-700 rounded" /></span>
            </li>

            <li className="flex gap-1">
                Click+E = End <span><Square color="red" className="bg-red-500 rounded" /></span>
            </li>

            <li className="flex gap-1">
                Click+R = Reset
            </li>

            <li className="flex gap-1">
                Click+V = Visualize

            </li>
        </ul>

    </div>
}


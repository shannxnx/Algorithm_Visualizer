import { Square } from "lucide-react";


export default function PathfindingGuide() {
    return <div className="lg:h-[10%] border-b  lg:w-[95%] rounded
            flex justify-center items-center">
        <ul className="h-full w-full flex justify-around items-center ">
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


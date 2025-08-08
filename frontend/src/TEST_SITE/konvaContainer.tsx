import { useEffect, useRef, useState } from "react";
import { Konva1 } from "./konva1";
import { algoStore } from "../STATE/algoStore";
import { Rect } from "react-konva";

//const div_x = 400;
//const div_y = 50;
//
//const width = 50;
//const height = 50;
//const gap = 5;
//
//let rectCount = 8;
//const totalWidth = (width + gap) * rectCount;
//
//interface rectInfo {
//    x: number,
//    y: number,
//    width: number,
//    height: number,
//    number?: string
//};
//
//const boxesInfo: Array<rectInfo> = [];
//
//for (let i = 0; i < rectCount; i++) {
//    const rect: rectInfo = {
//        width: width,
//        height: height,
//        x: i * (width + 5),
//        y: 0,
//        number: `${i}`
//
//    };
//
//    boxesInfo.push(rect);
//}
//
//

export default function KonvaContainer() {


    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);

    const [rects, setRects] = useState<number>(9);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);

    const div_x = 400;
    const div_y = 50;

    const width = 50;
    const height = 50;
    const gap = 5;

    let rectCount = 8;
    const totalWidth = (width + gap) * rects;

    interface rectInfo {
        x: number,
        y: number,
        width: number,
        height: number,
        number?: string
        id?: number
    };

    const boxesInfo: Array<rectInfo> = [];

    for (let i = 0; i < rects; i++) {
        const rect: rectInfo = {
            width: width,
            height: height,
            x: i * (width + 5),
            y: 0,
            number: `${i}`,
            id: i + 1
        };

        boxesInfo.push(rect);
    }






    useEffect(() => {
        setRectsArray(boxesInfo);
        if (mainRef.current) {
            const rect = mainRef.current.getBoundingClientRect();
            //console.log("Main element pos: ", rect);
        }
    }, []);


    console.log("boxes info: ", boxesInfo);
    console.log("Rect Counts: ", rects);

    const handleAdd = () => {
        setRects(rects + 1);
        //setRectsArray(boxesInfo);
    };

    console.log("Rects Array: ", rectsArray)

    const handleRemove = () => {
        setRects(rects - 1)
    }

    return <main className={`w-screen h-screen flex`} ref={mainRef}>

        <div className="border-1 w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200">

            {

                boxesInfo.length > 0 ? <Konva1 x={totalWidth} y={height} boxesInfo={boxesInfo} rectCount={rectCount} />
                    : null
            }

        </div>

        <div className="w-[40%] h-full flex flex-col justify-center items-center gap-10">
            <button className="border-1 scale-150 p-3 rounded" onClick={handleAdd}>
                Add
            </button>

            <button className="border-1 scale-150 p-3 rounded">
                Remove
            </button>


        </div>

    </main>



}













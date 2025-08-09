//import { useEffect, useRef, useState } from "react";
//import { Konva1 } from "./konva1";
//import { algoStore } from "../STATE/algoStore";
//import { Rect } from "react-konva";
//
//
//
//
//
//
//
//export default function KonvaContainer() {
//
//
//    const mainRef = useRef<HTMLElement>(null);
//    const rectCounts = algoStore((state: any) => state.rectCounts);
//    const setRectCounts = algoStore((state: any) => state.setRectCounts);
//
//    const [rects, setRects] = useState<number>(9);
//    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
//
//    const div_x = 400;
//    const div_y = 50;
//
//    const width = 50;
//    const height = 50;
//    const gap = 5;
//
//    let rectCount = 8;
//    const totalWidth = (width + gap) * rects;
//
//    interface rectInfo {
//        x: number,
//        y: number,
//        width: number,
//        height: number,
//        number: number
//        id: number
//    };
//
//    const boxesInfo: Array<rectInfo> = [];
//
//    for (let i = 0; i < rects; i++) {
//        const rect: rectInfo = {
//            width: width,
//            height: height,
//            x: i * (width + 5) + 5,
//            y: 0,
//            number: Math.floor(Math.random() * 10),
//            id: i
//        };
//
//        boxesInfo.push(rect);
//    }
//
//
//
//
//
//    useEffect(() => {
//        setRectsArray(boxesInfo);
//        if (mainRef.current) {
//            const rect = mainRef.current.getBoundingClientRect();
//        }
//    }, []);
//
//
//    console.log("boxes info: ", boxesInfo);
//    console.log("rects array: ", rectsArray);
//
//    const handleAdd = () => {
//        setRects(rects + 1);
//
//    };
//
//    const handleRemove = () => {
//        setRects(rects - 1);
//        setRectsArray(boxesInfo);
//    };
//
//
//
//    const handleSort = () => {
//
//        const sortedRectsArray = boxesInfo.sort((a, b) => a.number - b.number);
//        setRectsArray(sortedRectsArray);
//
//    }
//
//
//
//
//
//
//
//
//    return <main className={`w-screen h-screen flex`} ref={mainRef}>
//
//        <div className=" w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200">
//
//            {
//
//                boxesInfo.length > 0 ? <Konva1 x={totalWidth} y={height} boxesInfo={rectsArray} rectCount={rectCount} />
//                    : null
//            }
//
//        </div>
//
//        <div className="w-[40%] h-full flex flex-col justify-center items-center gap-5">
//            <button className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105" onClick={handleAdd}>
//                Add
//            </button>
//
//            <button className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//                onClick={handleRemove}>
//                Remove
//            </button>
//
//            <button className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
//                onClick={handleSort}>
//                Sort
//            </button>
//
//
//        </div>
//
//    </main>
//
//
//
//}
//










import { useEffect, useRef, useState } from "react";
import { Konva1 } from "./konva1";
import { algoStore } from "../STATE/algoStore";


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
        number: number
        id: number
    };


    const generateBoxesInfo = (count: number): Array<rectInfo> => {
        const boxesInfo: Array<rectInfo> = [];
        for (let i = 0; i < count; i++) {
            const rect: rectInfo = {
                width: width,
                height: height,
                x: i * (width + 5) + 5,
                y: 0,
                number: Math.floor(Math.random() * 10),
                id: i
            };
            boxesInfo.push(rect);
        }
        return boxesInfo;
    };


    useEffect(() => {
        const initialBoxes = generateBoxesInfo(rects);
        setRectsArray(initialBoxes);

        if (mainRef.current) {
            const rect = mainRef.current.getBoundingClientRect();
        }
    }, []);


    useEffect(() => {
        if (rectsArray.length > 0) {
            const newBoxes = generateBoxesInfo(rects);
            //const rectArrLen = rectsArray.length - 1;
            //const newRect: rectInfo = {
            //    width: width,
            //    height: height,
            //    x: rectArrLen * (width + 5) + 5,
            //    y: 0,
            //    number: Math.floor(Math.random() * 10),
            //    id: rectArrLen
            //};

            //const updatedsArray: Array<rectInfo> = [...rectsArray];
            //updatedsArray.push(newRect);

            setRectsArray(newBoxes);
        }
    }, [rects]);

    console.log("rects array: ", rectsArray);

    const handleAdd = () => {
        setRects(rects + 1);
    };

    const handleRemove = () => {
        if (rects > 1) {
            setRects(rects - 1);
        }
    };

    const handleSort = () => {

        const sortedArray = [...rectsArray].sort((a, b) => a.number - b.number);


        const updatedArray = sortedArray.map((rect, index) => ({
            ...rect,
            x: index * (width + 5) + 5,
            id: index
        }));

        setRectsArray(updatedArray);
    };

    return (
        <main className={`w-screen h-screen flex`} ref={mainRef}>
            <div className=" w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200">
                {
                    rectsArray.length > 0 ? (
                        <Konva1
                            x={totalWidth}
                            y={height}
                            boxesInfo={rectsArray} // Use rectsArray state instead of boxesInfo
                            rectCount={rectCount}
                        />
                    ) : null
                }
            </div>
            <div className="w-[40%] h-full flex flex-col justify-center items-center gap-5">
                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handleAdd}
                >
                    Add
                </button>
                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handleRemove}
                >
                    Remove
                </button>
                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handleSort}
                >
                    Sort
                </button>
            </div>
        </main>
    );
}



import { useEffect, useRef, useState } from "react";
import { Konva1 } from "./konva1";
import { algoStore } from "../STATE/algoStore";


export default function KonvaContainer() {
    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);
    const [rects, setRects] = useState<number>(5);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
    const [task, setTask] = useState<string>('');




    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);

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
            switch (task) {
                case 'add':
                    const updatedArray = [...rectsArray];

                    const rectArrayLen = updatedArray.length;
                    console.log(rectArrayLen);
                    const newRect: rectInfo = {
                        width: width,
                        height: height,
                        x: rectArrayLen * (width + 5) + 5,
                        y: 0,
                        number: Math.floor(Math.random() * 10),
                        id: rectArrayLen
                    };
                    updatedArray.push(newRect);
                    setRectsArray(updatedArray);
                    break;

                case 'insert':
                    const insertArray = [...rectsArray];
                    const insertArrayLen = insertArray.length;
                    const insertRect: rectInfo = {
                        width: width,
                        height: height,
                        x: insertArrayLen * (width + 5) + 5,
                        y: 0,
                        number: insertVal,
                        id: insertIndex
                    };
                    insertArray.splice(insertIndex, 0, insertRect);
                    const updatedIArr = insertArray.map((r, index) => ({
                        ...r,
                        x: index * (width + 5) + 5,
                        id: index,
                    }));
                    setRectsArray(updatedIArr);
                    break;
                case 'removeIndex':
                    const removeArray = [...rectsArray];

                    if (removeIndex - 1 <= removeArray.length) {
                        removeArray.splice(removeIndex - 1, 1);
                    }
                    else {
                        window.alert("Greater than index length!");
                    }
                    const updatedRArr = removeArray.map((r, index) => ({
                        ...r,
                        x: index * (width + 5) + 5,
                        id: index
                    }));
                    setRectsArray(updatedRArr);

                    break;
                case 'pop':
                    const udpatedArray = [...rectsArray];
                    udpatedArray.pop();
                    setRectsArray(udpatedArray);
                    break;
            }
        }
    }, [rects]);

    console.log("rects array: ", rectsArray);
    console.log("Task Clicked: ", task);
    console.log("removeIndex: ", removeIndex);
    console.log("rects: ", rects);

    const handleAdd = () => {
        setRects(rects + 1);
        setTask('add');
    };

    const handlePop = () => {
        if (rects > 1) {
            setRects(rects - 1);
            setTask('pop')
        }
    };

    const handleInsert = () => {
        setRects(rects + 1);
        setTask('insert');

    };

    const handleRemoveIndex = () => {
        if (rects > 1 && removeIndex < rects) {
            setRects(rects - 1);
            setTask("removeIndex");
        }
    }

    const handleSort = () => {

        const sortedArray = [...rectsArray].sort((a, b) => a.number - b.number);


        const updatedArray = sortedArray.map((rect, index) => ({
            ...rect,
            x: index * (width + 5) + 5,
            id: index
        }));

        setRectsArray(updatedArray);
    };

    const handleNewBoxes = () => {
        const newBoxes = generateBoxesInfo(rectsArray.length);
        setRectsArray(newBoxes);
    }

    return (
        <main className={`w-screen h-screen flex`} ref={mainRef}>
            <div className=" w-[60%] h-full flex items-center justify-center rounded-[8px] duration-200">
                {
                    rectsArray.length > 0 ? (
                        <Konva1
                            x={totalWidth}
                            y={height}
                            boxesInfo={rectsArray}
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


                <div className="w-[300px]  p-3 flex gap-2">
                    <button
                        className={`border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105 `}
                        onClick={handleInsert}
                    >
                        Insert
                    </button>
                    <input type="number" className="border-b-1 w-[50px] p-2 outline-none"
                        value={insertVal} name="value" onChange={(e) => setInsertVal(Number(e.target.value))} />

                    <input type="number" className="border-b-1 w-[50px] p-2 outline-none"
                        value={insertIndex} name="index" onChange={(e) => setInsertIndex(Number(e.target.value))} />

                </div>


                <div className="w-[300px]  p-3 flex gap-2">
                    <button
                        className={`border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105 `}
                        onClick={handleRemoveIndex}
                    >
                        Remove
                    </button>
                    <input type="number" className="border-b-1 w-[50px] p-2 outline-none"
                        value={removeIndex} name="indexR" onChange={(e) => setRemoveIndex(Number(e.target.value))} />

                </div>

                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handlePop}
                >
                    Pop
                </button>

                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handleSort}
                >
                    Sort
                </button>

                <button
                    className="border-1 p-3 rounded w-[100px] cursor-pointer hover:scale-105"
                    onClick={handleNewBoxes}
                >
                    New
                </button>

            </div>
        </main>
    );
}



import { useState, useRef, useEffect } from "react";
import { algoStore } from "../../../STATE/algoStore";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES/sortInterface";
import { MergeSortKonva } from "./MergeSortKonva";

const div_x = 400;
const div_y = 50;
const width = 50;
const height = 50;
const gap = 5;
let rectCount = 8;




export default function MergeSort() {

    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);
    const getMergeSort = sortStore((state: any) => state.getMergeSort);
    const mergeSortInfo = sortStore((state: any) => state.mergeSortInfo);

    const editSortCode = sortStore((state: any) => state.editSortCode);

    const [rects, setRects] = useState<number>(5);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
    const [task, setTask] = useState<string>('');

    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);

    const totalWidth = (width + gap) * rects;


    const [mergeArray, setMergeArray] = useState<Array<rectInfo>>([]);
    const [copyArray, setCopyArray] = useState<Array<rectInfo>>([]);

    interface rectInfo {
        x: number,
        y: number,
        width: number,
        height: number,
        number: number
        id: number
        color?: string
    };

    const generateBoxesInfo = (count: number): Array<rectInfo> => {
        const boxesInfo: Array<rectInfo> = [];
        const copyBoxes: Array<rectInfo> = [];
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
        const konvaWidth: number = 655;
        const konvaHeight: number = 420;

        const rectWidth = count > 6 ? 40 : 45;
        const spacing = 5;
        const totalWidth = count * rectWidth + (count - 1) * spacing
        const startX = (konvaWidth / 2) - (totalWidth / 2);

        const spacing2 = 20;
        const totalWidth2 = count * rectWidth + (count - 1) * spacing2;
        const startX2 = (konvaWidth / 2) - (totalWidth2 / 2);


        for (let i = 0; i < count; i++) {

            const rect: rectInfo = {
                x: startX + i * (rectWidth + spacing),
                y: -45,
                width: rectWidth,
                height: rectWidth,
                id: i,
                number: Math.floor(Math.random() * 100),
                color: colors[i % colors.length]
            }

            const copyRect: rectInfo = {
                x: startX2 + i * (rectWidth + spacing2),
                y: -45,
                width: rectWidth,
                height: rectWidth,
                id: i,
                number: rect.number
            }

            boxesInfo.push(rect);
            copyBoxes.push(copyRect);
        }
        setCopyArray(copyBoxes);
        return boxesInfo;
    };


    useEffect(() => {
        setRectsArray(generateBoxesInfo(7));
        //setMergeArray(generateBoxesInfo(6));
        getMergeSort();

    }, []);

    const MergePayload: SortKit = {
        algoName: mergeSortInfo.algoName,
        algoInfo: mergeSortInfo.algoInfo,
        codes: mergeSortInfo.codes,
        editAlgoInfo: editSortCode

    };





    useEffect(() => {
        if (rectsArray.length > 0 && task) {
            switch (task) {
                case 'add':

                    const updatedArray = [...rectsArray];
                    const rectArrayLen = updatedArray.length;

                    const lastItem = updatedArray[rectArrayLen - 1];

                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const newRect: rectInfo = {
                        width: lastItem.width,
                        height: lastItem.height,
                        x: lastItem.x + lastItem.width + 5,
                        y: lastItem.y,
                        number: Math.floor(Math.random() * 10),
                        id: rectArrayLen,
                        color: colors[rectArrayLen % colors.length]
                    };
                    updatedArray.push(newRect);
                    setRectsArray(updatedArray);
                    break;

                case 'insert':
                    const insertArray = [...rectsArray];
                    const insertColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const insertRect: rectInfo = {
                        width: width,
                        height: height,
                        x: 0, // Will be updated below
                        y: 0,
                        number: insertVal,
                        id: insertIndex,
                        color: insertColors[insertIndex % insertColors.length]
                    };
                    insertArray.splice(insertIndex, 0, insertRect);
                    const updatedIArr = insertArray.map((r, index) => ({
                        ...r,
                        x: index * (width + gap) + gap,
                        id: index,
                        color: insertColors[index % insertColors.length]
                    }));
                    setRectsArray(updatedIArr);
                    break;

                case 'removeIndex':
                    const removeArray = [...rectsArray];
                    if (removeIndex < removeArray.length) {
                        removeArray.splice(removeIndex, 1);
                        const removeColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                        const updatedRArr = removeArray.map((r, index) => ({
                            ...r,
                            x: index * (width + gap) + gap,
                            id: index,
                            color: removeColors[index % removeColors.length]
                        }));
                        setRectsArray(updatedRArr);

                    } else {
                        alert("Index out of bounds!");
                    }
                    break;

                case 'pop':
                    const poppedArray = [...rectsArray];
                    poppedArray.pop();
                    setRectsArray(poppedArray);
                    break;
            }
            setTask('');
        }
    }, [task, rectsArray, insertVal, insertIndex, removeIndex]);

    const handleAdd = () => {
        if (rects <= 10) {
            setRects(rects + 1);
            setTask('add');
        }
    };

    const handlePop = () => {
        if (rects > 1) {
            setRects(rects - 1);
            setTask('pop');
        }
    };

    const handleInsert = () => {
        if (insertIndex <= rects && rects <= 10) {
            setRects(rects + 1);
            setTask('insert');
        }
        else {
            toast.error("Maximum array length!")

        }
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
            x: index * (width + gap) + gap,
            id: index
        }));
        setRectsArray(updatedArray);
    };

    const handleNewBoxes = () => {
        const newBoxes = generateBoxesInfo(rectsArray.length);
        setRectsArray(newBoxes);
    }


    console.log("Redts Array: ", rectsArray);


    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] h-[75%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">
                {
                    rectsArray.length > 0 ? (
                        <MergeSortKonva
                            x={totalWidth}
                            y={height}
                            boxesInfo={rectsArray}
                            rectCount={rectCount}
                            copyArray={copyArray}
                            isAnimating={isAnimating}
                            setIsAnimating={setIsAnimating}
                        />
                    ) : null
                }
            </div>



            <div className="w-[95%] h-[120px] flex items-center justify-around mb-3 border-black">

                <div className="w-[35%] h-full border-1 flex flex-col border-black">

                    <div className="w-full h-1/2 flex justify-around items-center border-b-1 border-black">

                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"
                            disabled={isAnimating}
                            onClick={handleAdd}
                        >
                            Add
                        </button>

                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"
                            disabled={isAnimating}
                            onClick={handlePop}
                        >
                            Pop
                        </button>

                        <button className="text-2xl border-1  h-[36px] w-[64px] disabled:opacity-50 rounded
                        cursor-pointer hover:scale-105 duration-150 text-black"
                            disabled={isAnimating}
                            onClick={handleNewBoxes}
                        >
                            New
                        </button>

                    </div>


                    <div className="w-full h-[50%] flex items-center justify-center">
                        <button className="text-3xl border-1 w-[130px] rounded bg-green-400
                        disabled:opacity-50 cursor-pointer hover:scale-105 duration-150 text-black"
                            onClick={() => setIsAnimating(true)}
                            disabled={isAnimating}>
                            Animate
                        </button>
                    </div>
                </div>


                <div className="w-[440px] h-full  border-black
                        flex items-center justify-end cursor-pointer gap-2 bg-white">

                    <div className="w-[90%] h-full border-1 flex flex-col items-center
                            justify-center gap-2 border-black">

                        <div className="w-[80%] h-[40%] flex items-center">

                            <button className="text-2xl h-full border-1 p-1 rounded hover:scale-105 duration-100 cursor-pointer
                            bg-green-400 disabled:opacity-50 text-black "
                                disabled={isAnimating}
                                onClick={handleInsert}
                            >
                                Insert
                            </button>
                            <label htmlFor="value" className="ml-1 text-black">Value</label>

                            <input type="number" name="value" className="border-1 w-[54px] ml-3 text-[16px] p-1
                            outline-none text-black"
                                max={999}
                                value={insertVal}
                                onChange={(e) => setInsertVal(Number(e.target.value))}
                                disabled={isAnimating} />


                            <label htmlFor="index" className="ml-1 text-black">Index</label>
                            <input type="number" name="index"
                                className="border-1 w-[54px] text-[16px] ml-2 p-1
                            outline-none text-black "
                                min={0}
                                disabled={isAnimating}
                                value={insertIndex}
                                onChange={(e) => setInsertIndex(Number(e.target.value))}
                                max={rects - 1}
                            />


                        </div>

                        <div className="w-[80%] h-[40%]  items-center flex">
                            <button className="text-2xl h-full border-1 p-1 rounded hover:scale-105 duration-100 cursor-pointer
                            bg-red-500 disabled:opacity-50 text-black"
                                disabled={isAnimating}
                                onClick={handleRemoveIndex}
                            >
                                Remove
                            </button>
                            <label htmlFor="indexR" className="ml-1 text-black">Index</label>

                            <input type="number" className="border-1 w-[54px] ml-3 text-[16px] p-1
                                    outline-none text-black"
                                min={0}
                                max={rects - 1}
                                value={removeIndex}
                                onChange={(e) => setRemoveIndex(Number(e.target.value))}
                                name="indexr"
                                disabled={isAnimating}
                            />

                        </div>
                    </div>

                    <div className="w-[10%] h-full border-1 flex justify-center items-center border-black">
                        <ArrowLeft color="black" />
                    </div>
                </div>

            </div>

        </div>

        <AlgoInfo algoInfo={MergePayload} />


    </main>
}
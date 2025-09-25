import { useState, useRef, useEffect } from "react";
import { algoStore } from "../../../STATE/algoStore";
import { Konva1 } from "./konva1";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import ButtonV1 from "../../../COMPONENTS/BUTTONS/ButtonV1";

const div_x = 400;
const div_y = 50;
const width = 50;
const height = 50;
const gap = 5;
let rectCount = 8;


type animation = "idle" | "animating" | "done";


export default function BubbleSort() {

    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);
    const getBubbleSort = sortStore((state: any) => state.getBubbleSort);
    const bubbleSortInfo = sortStore((state: any) => state.bubbleSortInfo);


    const editSortCode = sortStore((state: any) => state.editSortCode);

    const [rects, setRects] = useState<number>(5);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
    const [task, setTask] = useState<string>('');
    //const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<animation>("idle");


    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);

    const [showButton, setShowButton] = useState<boolean>(true);

    const totalWidth = (width + gap) * rects;

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
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

        for (let i = 0; i < count; i++) {
            const rect: rectInfo = {
                width: width,
                height: height,
                x: i * (width + gap) + gap,
                y: 0,
                number: Math.floor(Math.random() * 10),
                id: i,
                color: colors[i % colors.length]
            };
            boxesInfo.push(rect);
        }
        return boxesInfo;
    };


    useEffect(() => {
        setRectsArray(generateBoxesInfo(5));
        getBubbleSort();
    }, []);


    const BubblePayload: SortKit = {
        algoInfo: bubbleSortInfo.algoInfo,
        algoName: bubbleSortInfo.algoName,
        codes: bubbleSortInfo.codes,
        editAlgoInfo: editSortCode
    };


    const animateBubbleSort = async () => {
        setIsAnimating("animating");
        const array = [...rectsArray];
        const liftHeight = 50;
        const steps = 20;

        // Initialize all rectangles
        array.forEach(rect => {
            rect.color = '#3B82F6';
            rect.y = 0;
        });

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                // Highlight comparison
                array[j].color = '#EF4444';
                array[j + 1].color = '#EF4444';
                setRectsArray([...array]);
                await new Promise(resolve => setTimeout(resolve, 100));

                if (array[j].number > array[j + 1].number) {
                    // Indicate swap
                    array[j].color = '#F97316';
                    array[j + 1].color = '#F97316';
                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 100));

                    const rectJ = { ...array[j] };
                    const rectJPlus1 = { ...array[j + 1] };

                    // LIFT PHASE
                    for (let step = 1; step <= steps; step++) {
                        const progress = step / steps;
                        setRectsArray(array.map((rect, idx) => {
                            if (idx === j) return { ...rectJ, y: -progress * liftHeight };
                            if (idx === j + 1) return { ...rectJPlus1, y: -progress * liftHeight };
                            return { ...rect };
                        }));
                        await new Promise(resolve => setTimeout(resolve, 20));
                    }

                    // MOVE PHASE (while lifted)
                    for (let step = 1; step <= steps; step++) {
                        const progress = step / steps;
                        setRectsArray(array.map((rect, idx) => {
                            if (idx === j) {
                                return {
                                    ...rectJ,
                                    x: rectJ.x + (rectJPlus1.x - rectJ.x) * progress,
                                    y: -liftHeight
                                };
                            }
                            if (idx === j + 1) {
                                return {
                                    ...rectJPlus1,
                                    x: rectJPlus1.x + (rectJ.x - rectJPlus1.x) * progress,
                                    y: -liftHeight
                                };
                            }
                            return { ...rect };
                        }));
                        await new Promise(resolve => setTimeout(resolve, 20));
                    }

                    // ACTUAL DATA SWAP (mid-air, with updated x)
                    const swappedJ = { ...rectJPlus1, x: rectJ.x };
                    const swappedJPlus1 = { ...rectJ, x: rectJPlus1.x };
                    array[j] = swappedJ;
                    array[j + 1] = swappedJPlus1;

                    // LOWER PHASE (now they land with new numbers)
                    for (let step = 1; step <= steps; step++) {
                        const progress = step / steps;
                        setRectsArray(array.map((rect, idx) => {
                            if (idx === j) {
                                return {
                                    ...array[j],
                                    y: -liftHeight + progress * liftHeight,
                                    color: progress === 1 ? '#10B981' : '#F97316'
                                };
                            }
                            if (idx === j + 1) {
                                return {
                                    ...array[j + 1],
                                    y: -liftHeight + progress * liftHeight,
                                    color: progress === 1 ? '#10B981' : '#F97316'
                                };
                            }
                            return { ...rect };
                        }));
                        await new Promise(resolve => setTimeout(resolve, 20));
                    }

                    // Lock in positions
                    array[j].y = 0;
                    array[j].id = j;
                    array[j].color = '#10B981';

                    array[j + 1].y = 0;
                    array[j + 1].id = j + 1;
                    array[j + 1].color = '#10B981';

                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                else {
                    // No swap
                    array[j].color = '#EAB308';
                    array[j + 1].color = '#EAB308';
                    setRectsArray([...array]);
                    await new Promise(resolve => setTimeout(resolve, 200));

                    array[j].color = '#3B82F6';
                    array[j + 1].color = '#3B82F6';
                    setRectsArray([...array]);
                }
            }

            // Mark sorted element
            //array[array.length - i - 1].color = '#8B5CF6';
            setRectsArray([...array]);
        }

        // Celebration rainbow
        const rainbowColors = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
        setRectsArray(array.map((rect, index) => ({
            ...rect,
            color: rainbowColors[index % rainbowColors.length]
        })));
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Final colors
        setRectsArray(array.map((rect, index) => {
            const ratio = index / (array.length - 1);
            const colors = ['#10B981', '#06B6D4', '#3B82F6', '#8B5CF6'];
            return {
                ...rect,
                color: colors[Math.floor(ratio * (colors.length - 1))]
            };
        }));

        setIsAnimating("done");
    };





    useEffect(() => {
        if (rectsArray.length > 0 && task) {
            switch (task) {
                case 'add':
                    const updatedArray = [...rectsArray];
                    const rectArrayLen = updatedArray.length;
                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const newRect: rectInfo = {
                        width: width,
                        height: height,
                        x: rectArrayLen * (width + gap) + gap,
                        y: 0,
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
        setIsAnimating("idle")
    };


    const handleAnimate = async () => {
        await animateBubbleSort();
        setIsAnimating("done")
    }

    const showButtonProps = {
        value: showButton,
        action: (val: boolean) => setShowButton(val)
    };




    const actionsProps = {
        add: handleAdd,
        pop: handlePop,
        new: handleNewBoxes,
        insert: handleInsert,
        remove: handleRemoveIndex,
        animateForBubbleSort: handleAnimate,

        setInsertValue: (val: number) => setInsertVal(val),
        setIndexValue: (val: number) => setInsertIndex(val),
        setRemoveIndex: (val: number) => setRemoveIndex(val),


    };

    const stateProps = {
        isAnimating: isAnimating,
        insertValue: insertVal,
        insertIndex: insertIndex,
        removeIndex: removeIndex,
        arrayLength: Number(rects)

    };

    console.log("Is animating: ", isAnimating);




    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="w-[60%] h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] h-[75%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">
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


            <ButtonV1 showButton={showButtonProps} actions={actionsProps} states={stateProps} />


        </div>

        <AlgoInfo algoInfo={BubblePayload} />


    </main>
}







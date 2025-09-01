import { useState, useRef, useEffect } from "react";
import { algoStore } from "../../../STATE/algoStore";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { ArrowLeft, Space } from "lucide-react";
import { toast } from "react-toastify";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES/sortInterface";
import { MergeSortKonva } from "./MergeSortKonva";
import { mergeStore } from "./STORE/mergeStore";
import useMeasure from "react-use-measure";
import ButtonV1 from "../../../COMPONENTS/BUTTONS/ButtonV1";
import { animate } from "framer-motion";


const div_x = 400;
const div_y = 50;
const width = 50;
const height = 50;
const gap = 5;
let rectCount = 8;


type animation = "idle" | "animating" | "done";



export default function MergeSort() {

    const setLeft = mergeStore((state: any) => state.setLeft);
    const left = mergeStore((state: any) => state.left);
    const right = mergeStore((state: any) => state.right);




    const animationControllerRef = useRef<{ shouldStop: boolean }>({ shouldStop: false });



    const leftH1 = mergeStore((state: any) => state.leftH1);
    const leftH2 = mergeStore((state: any) => state.leftH2);
    const rightH1 = mergeStore((state: any) => state.rightH1);
    const rightH2 = mergeStore((state: any) => state.rightH2);

    const sortedLeftH1 = mergeStore((state: any) => state.sortedLeftH1);
    const sortedLeftH2 = mergeStore((state: any) => state.sortedLeftH2);
    const sortedRightH1 = mergeStore((state: any) => state.sortedRightH1);
    const sortedRightH2 = mergeStore((state: any) => state.sortedRightH2);

    const toBeSortedLeftH1 = mergeStore((state: any) => state.toBeSortedLeftH1);
    const toBeSortedLeftH2 = mergeStore((state: any) => state.toBeSortedLeftH2);
    const toBeSortedRightH1 = mergeStore((state: any) => state.toBeSortedRightH1);
    const toBeSortedRightH2 = mergeStore((state: any) => state.toBeSortedRightH2);



    const konvaDivRef = useRef<HTMLDivElement | null>(null);
    const [konvaDivWidth, setKonvaDivWidth] = useState<number>(0);





    const mainRef = useRef<HTMLElement>(null);
    const rectCounts = algoStore((state: any) => state.rectCounts);
    const setRectCounts = algoStore((state: any) => state.setRectCounts);
    const getMergeSort = sortStore((state: any) => state.getMergeSort);
    const mergeSortInfo = sortStore((state: any) => state.mergeSortInfo);

    const editSortCode = sortStore((state: any) => state.editSortCode);

    const [rects, setRects] = useState<number>(5);
    const [rectsArray, setRectsArray] = useState<Array<rectInfo>>([]);
    const [task, setTask] = useState<string>('');

    const [isAnimating, setIsAnimating] = useState<animation>("idle");

    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);

    const totalWidth = (width + gap) * rects;


    const [mergeArray, setMergeArray] = useState<Array<rectInfo>>([]);
    const [copyArray, setCopyArray] = useState<Array<rectInfo>>([]);


    const [showButton, setShowButton] = useState<boolean>(true);


    const handleAnimating = (animate: animation) => {
        setIsAnimating(animate);
    }

    interface rectInfo {
        x: number,
        y: number,
        width: number,
        height: number,
        number: number
        id: number
        color?: string
    };

    const [ref, bounds] = useMeasure();

    console.log("Ref width: ", bounds.width);

    const generateBoxesInfo = (count: number): Array<rectInfo> => {
        const boxesInfo: Array<rectInfo> = [];
        const copyBoxes: Array<rectInfo> = [];
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
        const konvaWidth: number = Math.floor(bounds.width);


        const rectWidth = konvaWidth >= 700 ? count > 6 ? 40 : 45 : count > 6 ? 25 : 30;
        const spacing = 5;
        const totalWidth = count * rectWidth + (count - 1) * spacing
        const startX = (konvaWidth / 2) - (totalWidth / 2);

        const spacing2 = 20;
        const totalWidth2 = count * rectWidth + (count - 1) * spacing2;
        const startX2 = (konvaWidth / 2) - (totalWidth2 / 2);
        const startX3 = (konvaWidth / 2) - (totalWidth2 / 2);

        console.log("Total width (7): ", totalWidth);
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
        if (bounds.width && bounds.height > 0) {
            setRectsArray(generateBoxesInfo(7));
            getMergeSort();
        }

    }, [bounds.width]);

    const MergePayload: SortKit = {
        algoName: mergeSortInfo.algoName,
        algoInfo: mergeSortInfo.algoInfo,
        codes: mergeSortInfo.codes,
        editAlgoInfo: editSortCode

    };





    useEffect(() => {
        if (rectsArray.length > 0 && task) {

            const insertArray = [...rectsArray];
            const arrayLength = rectsArray.length + 1;


            const konvaWidth: number = bounds.width;

            const rectWidth = arrayLength > 6 ? 40 : 45;

            const spacing = 5;
            const totalWidth = arrayLength * rectWidth + (arrayLength - 1) * spacing
            const startX = (konvaWidth / 2) - (totalWidth / 2);

            const spacing2 = 20;
            const totalWidth2 = arrayLength * rectWidth + (arrayLength - 1) * spacing2;


            switch (task) {
                case 'add':
                    const updatedArray = [...rectsArray];
                    const rectArrayLen = updatedArray.length;

                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const newRect: rectInfo = {
                        width: rectWidth,
                        height: rectWidth,
                        x: 0,
                        y: -45,
                        number: Math.floor(Math.random() * 10),
                        id: rectArrayLen,
                        color: colors[rectArrayLen % colors.length]
                    };

                    updatedArray.push(newRect);

                    const centeredArray = updatedArray.map((r, i) => ({
                        ...r,
                        width: rectWidth,
                        height: rectWidth,
                        x: startX + i * (rectWidth + spacing),
                        y: -45,
                        id: i
                    }));

                    setRectsArray(centeredArray);
                    break;

                case 'insert':
                    let insertLength = rectsArray.length - 1;
                    const insertColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const insertRect: rectInfo = {
                        width: rectWidth,
                        height: rectWidth,
                        x: 0,
                        y: 0,
                        number: insertVal,
                        id: insertIndex,
                        color: insertColors[insertIndex % insertColors.length]
                    };

                    insertArray.splice(insertIndex, 0, insertRect);

                    const updatedIArr = insertArray.map((r, index) => ({
                        ...r,
                        width: rectWidth,
                        height: rectWidth,
                        y: -45,
                        x: startX + index * (rectWidth + spacing),
                        id: index,
                        color: insertColors[index % insertColors.length]
                    }));

                    setRectsArray(updatedIArr);
                    break;

                case 'removeIndex':
                    const removeArray = [...rectsArray];

                    if (removeIndex - 1 < removeArray.length) {
                        removeArray.splice(removeIndex, 1);

                        const rmLength = removeArray.length;
                        const rmKonvaWidth = bounds.width;
                        const rmSpacing = 5;
                        const rmRectWidth = rmLength > 6 ? 40 : 45;

                        const rmTotalWidth = rmLength * rmRectWidth + (rmLength - 1) * rmSpacing;


                        const rmStartX = (rmKonvaWidth / 2) - (rmTotalWidth / 2);


                        const removeColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                        const updatedRArr = removeArray.map((r, index) => ({
                            ...r,
                            width: rmRectWidth,
                            height: rmRectWidth,
                            x: rmStartX + index * (rmRectWidth + rmSpacing),
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

                    const newLength = poppedArray.length;
                    const newKonvaWidth = bounds.width;
                    const newSpacing = 5;
                    const newRectWidth = newLength > 6 ? 40 : 45;

                    const newTotalWidth = newLength * newRectWidth + (newLength - 1) * newSpacing;
                    const newStartX = (newKonvaWidth / 2) - (newTotalWidth / 2);

                    const updatedArr = poppedArray.map((r, index) => ({
                        ...r,
                        width: newRectWidth,
                        height: newRectWidth,
                        x: newStartX + index * (newRectWidth + newSpacing),
                        y: -45,
                        id: index,
                    }));

                    setRectsArray(updatedArr);
                    break;
            }
            setTask('');
        }
    }, [task, rectsArray, insertVal, insertIndex, removeIndex]);



    const handleAdd = () => {
        if (bounds.width >= 650 && rectsArray.length >= 9) {
            return toast("Max array reached!");
        }
        else if (bounds.width < 400 && rectsArray.length > 6) {
            return toast("Max array reached!");
        }
        if (rectsArray.length < 10) {
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
        if (bounds.width >= 650 && rectsArray.length >= 9) {
            return toast("Max array reached!");
        }
        else if (bounds.width < 400 && rectsArray.length > 6) {
            return toast("Max array reached!");
        }

        if (insertIndex <= rectsArray.length && rectsArray.length < 10) {
            setRects(rects + 1);
            setTask('insert');
        }

    };

    const handleRemoveIndex = () => {
        if (rectsArray.length > 1 && removeIndex < rectsArray.length) {
            setRects(rectsArray.length - 1);
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

        if (isAnimating === "animating") {
            animationControllerRef.current.shouldStop = true;
        }

        const newBoxes = generateBoxesInfo(rectsArray.length);
        setRectsArray(newBoxes);
        setIsAnimating("idle");


        mergeStore.getState().resetState();
    };


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
        animate: () => setIsAnimating("animating"),

        setInsertValue: (val: number) => setInsertVal(val),
        setIndexValue: (val: number) => setInsertIndex(val),
        setRemoveIndex: (val: number) => setRemoveIndex(val),


    };

    const stateProps = {
        isAnimating: isAnimating,
        insertValue: insertVal,
        insertIndex: insertIndex,
        removeIndex: removeIndex,
        arrayLength: Number(rectsArray.length)

    };

    console.log("Array Length: ", rectsArray.length);




    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center">



            <div className="w-[95%] lg:h-[75%] h-[85%] md:h-[90%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black"
                ref={ref}>
                {
                    rectsArray.length > 0 ? (
                        <MergeSortKonva
                            x={totalWidth}
                            y={height}
                            boxesInfo={rectsArray}
                            rectCount={rectCount}
                            copyArray={copyArray}
                            isAnimating={isAnimating}
                            setIsAnimating={handleAnimating}
                            animationControllerRef={animationControllerRef}
                            konvaWidth={bounds.width}
                            konvaHeight={420}

                        />
                    ) : null
                }
            </div>

            <div className="w-[95%] h-[120px] flex items-center justify-around rounded mb-3 border-black border hidden ">

            </div>

            {
                showButton && rectsArray && <ButtonV1 showButton={showButtonProps} actions={actionsProps} states={stateProps} />

            }


        </div>

        <AlgoInfo algoInfo={MergePayload} />


    </main>
}
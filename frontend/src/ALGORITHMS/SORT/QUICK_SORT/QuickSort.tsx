import { useEffect, useState } from "react";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import ButtonV1 from "../../../COMPONENTS/BUTTONS/ButtonV1";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface";
import useMeasure from "react-use-measure";
import React from "react";
import { QuickSortKonva } from "./QuickSortKonva";

type animation = "idle" | "animating" | "done";


export default function QuickSort() {

    const quickSortInfo = sortStore((state: any) => state.quickSortInfo);
    const getQuickSort = sortStore((state: any) => state.getQuickSort);
    const editSortCode = sortStore((state: any) => state.editSortCode);
    const [showButtons, setShowButtons] = useState<boolean>(true);
    const [task, setTask] = useState<string>('');
    const [ref, bounds] = useMeasure();

    const [animating, setIsAnimating] = useState<string>("idle");

    const [rectsArray, setRectsArray] = useState<rectInfo[]>([]);

    const handleAdd = () => {

        if (rectsArray.length < 10) {
            setTask('add');

        }
    };

    const showButton = {
        value: showButtons,
        action: (val: boolean) => setShowButtons(val)
    };



    useEffect(() => {
        getQuickSort();
    }, []);

    const QuickPayload: SortKit = {
        algoName: quickSortInfo.algoName,
        algoInfo: quickSortInfo.algoInfo,
        codes: quickSortInfo.codes,
        editAlgoInfo: editSortCode

    };

    type KonvaProps = {
        boxesInfo: rectInfo[];
        isAnimating?: animation;
        setIsAnimating?: (animate: animation) => void;
        animationControllerRef?: React.RefObject<{ shouldStop: boolean }>;
        konvaWidth?: number;
        konvaHeight?: number;
    }

    const QuickSortKonvaProps: KonvaProps = {
        boxesInfo: rectsArray,
        isAnimating: "idle",
        setIsAnimating: setIsAnimating,
        konvaWidth: Math.floor(bounds.width),
        konvaHeight: 420
    };

    useEffect(() => {
        if (bounds.width && bounds.height > 0) {
            setRectsArray(generateBoxesInfo(3));
        }

    }, [bounds.width]);


    const generateBoxesInfo = (count: number): Array<rectInfo> => {
        const boxesInfo: Array<rectInfo> = [];
        const copyBoxes: Array<rectInfo> = [];
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
        const konvaWidth: number = bounds.width;

        console.log("Konva width (generate qs): ", konvaWidth);
        const rectWidth = konvaWidth >= 700 ? count > 6 ? 40 : 45 : count > 6 ? 25 : 30;
        const spacing = 5;
        const totalWidth = count * rectWidth + (count - 1) * spacing
        const startX = (konvaWidth / 2) - (totalWidth / 2);

        console.log("StartX: ", startX)
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
            boxesInfo.push(rect);

        }

        return boxesInfo;
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

            }
            setTask("");
        }
    }, [rectsArray, task]);

    const actionProps = {
        add: handleAdd
    }



    console.log("Array (Quick Sort): ", rectsArray);
    console.log("Task (Quick Sort): ", task);

    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center" ref={ref}>

            <div className="w-[95%] lg:h-[75%] h-[85%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">

                {
                    rectsArray.length > 0 ? <QuickSortKonva props={QuickSortKonvaProps} />
                        : null
                }


            </div>


            <ButtonV1 showButton={showButton} actions={actionProps} />



        </div >


        <AlgoInfo algoInfo={QuickPayload} />






    </main >
}
import { useEffect, useState } from "react";
import AlgoInfo from "../../../COMPONENTS/INFO_CONTENT/AlgoInfo";
import { sortStore } from "../../../STATE/sortingStore";
import type { SortKit } from "../../../INTERFACES && TYPES/sortInterface";
import ButtonV1 from "../../../COMPONENTS/BUTTONS/ButtonV1";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface";
import useMeasure from "react-use-measure";
import React from "react";
import toast from "react-hot-toast";
import InsertionSortKonva from "./InsertionSortKonva";
import { generateBoxesInfo } from "../HELPER_FUNCTION/helpter";



type InsertionPayload = {
    boxesInfo: rectInfo[];
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    animationControllerRef?: React.RefObject<{ shouldStop: boolean }>;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: (array: rectInfo[]) => void;
}

export default function InsertionSort() {


    const insertionSortInfo = sortStore((state: any) => state.insertionSortInfo);
    const getInsertionSort = sortStore((state: any) => state.getInsertionSort);

    const editSortCode = sortStore((state: any) => state.editSortCode);
    const [showButtons, setShowButtons] = useState<boolean>(true);
    const [task, setTask] = useState<string>('');
    const [ref, bounds] = useMeasure();
    const [isAnimating, setIsAnimating] = useState<animation>("idle");
    const [insertVal, setInsertVal] = useState<number>(0);
    const [insertIndex, setInsertIndex] = useState<number>(0);
    const [removeIndex, setRemoveIndex] = useState<number>(0);


    const [rectsArray, setRectsArray] = useState<rectInfo[]>([]);

    const handleAdd = () => {

        if (rectsArray.length < 10) {
            setTask('add');

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
            setTask('insert');
        }

    };

    const handlePop = () => {
        if (rectsArray.length > 1) {
            setTask('pop');

        }
    };

    const handleRemoveIndex = () => {
        if (rectsArray.length > 1 && removeIndex < rectsArray.length) {
            setTask("removeIndex");
        }
    }

    const handleNewBoxes = () => {
        setRectsArray(generateBoxesInfo(rectsArray.length, bounds));
        setIsAnimating("idle");
        toast("clicked new boxes");

    };





    useEffect(() => {
        getInsertionSort();
    }, []);

    console.log("Insertion sort: ", insertionSortInfo);

    const InsertionPayload: SortKit = {
        algoName: insertionSortInfo.algoName,
        algoInfo: insertionSortInfo.algoInfo,
        codes: insertionSortInfo.codes,
        editAlgoInfo: editSortCode

    };


    const InsertionSortKonvaProps: InsertionPayload = {
        boxesInfo: rectsArray,
        isAnimating: isAnimating,
        setIsAnimating: setIsAnimating,
        konvaWidth: Math.floor(bounds.width),
        konvaHeight: 420,
        setBoxesInfo: (array: rectInfo[]) => setRectsArray(array)
    };

    useEffect(() => {
        if (bounds.width && bounds.height > 0) {
            setRectsArray(generateBoxesInfo(5, bounds));
        }

    }, [bounds.width]);




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
                        color: "blue"                         //colors[rectArrayLen % colors.length]
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
                case "insert":


                    const insertColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
                    const insertRect: rectInfo = {
                        width: rectWidth,
                        height: rectWidth,
                        x: 0,
                        y: 0,
                        number: insertVal,
                        id: insertIndex,
                        color: "blue"                         //colors[rectArrayLen % colors.length]
                    };

                    insertArray.splice(insertIndex, 0, insertRect);

                    const updatedIArr = insertArray.map((r, index) => ({
                        ...r,
                        width: rectWidth,
                        height: rectWidth,
                        y: -45,
                        x: startX + index * (rectWidth + spacing),
                        id: index,
                        ccolor: "blue"                         //colors[rectArrayLen % colors.length]
                    }));

                    setRectsArray(updatedIArr);
                    break;
                case "removeIndex":
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
                            color: "blue"                         //colors[rectArrayLen % colors.length]
                        }));
                        setRectsArray(updatedRArr);

                    } else {
                        alert("Index out of bounds!");
                    }
                    break;
                case "pop":
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
            setTask("");
        }
    }, [rectsArray, task]);



    const showButton = {
        value: showButtons,
        action: (val: boolean) => setShowButtons(val)
    };

    const stateProps = {
        isAnimating: isAnimating,
        insertValue: insertVal,
        insertIndex: insertIndex,
        removeIndex: removeIndex,
        arrayLength: Number(rectsArray.length)

    };

    const actionProps = {
        add: handleAdd,
        insert: handleInsert,
        pop: handlePop,
        new: handleNewBoxes,
        remove: handleRemoveIndex,
        animate: () => setIsAnimating("animating"),


        setInsertValue: (val: number) => setInsertVal(val),
        setIndexValue: (val: number) => setInsertIndex(val),
        setRemoveIndex: (val: number) => setRemoveIndex(val),

    }





    return <main className="w-screen h-screen flex gap-5 overflow-x-hidden p-2 bg-black">


        <div className="lg:w-[60%] w-full h-full border-1 relative flex flex-col rounded bg-white
        items-center" ref={ref}>

            <div className="w-[95%] lg:h-[75%] h-[85%] border-1
             flex items-center justify-center rounded-[8px] duration-200 bg-white/70 backdrop-blur-sm shadow-xl m-4 
             overflow-x-scroll border-black">



            </div>


            <ButtonV1 showButton={showButton} actions={actionProps} states={stateProps} />



        </div >


        <AlgoInfo algoInfo={InsertionPayload} />






    </main >
}
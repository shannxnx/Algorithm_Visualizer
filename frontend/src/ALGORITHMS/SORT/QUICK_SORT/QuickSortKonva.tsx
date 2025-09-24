//import React, { useEffect, useRef, useState } from "react";
//import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
//import { Layer, Stage, } from "react-konva";
//import {
//    RectangleRenderer,
//    RectangleRendererScale,
//    SortRectangleRenderer,
//    SingleRectangleRenderer,
//    RectangleGroup
//} from "../../../RENDERER/Renderer";
//import Konva from "konva";
//import { animateTo, animateScale, animationScaleSmooth, animatePartition, type partionProps, animatePartition2, animatePartition3 } from "../HELPER_FUNCTION/animation.helper";
//
//
//
//type QuickPayload = {
//    boxesInfo: Array<rectInfo>;
//    isAnimating?: animation;
//    setIsAnimating?: (animate: animation) => void;
//    animationControllerRef?: React.RefObject<{ shouldStop: boolean }>;
//    konvaWidth?: number,
//    konvaHeight?: number,
//    setBoxesInfo: (array: rectInfo[]) => void;
//};
//
//interface QuickSortProps {
//    props: QuickPayload
//}
//
//const exRect: rectInfo = {
//    width: 0,
//    height: 0,
//    x: 0,
//    y: 0,
//    number: 0,
//    scaleX: 0,
//    scaleY: 0
//};
//
//
//export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
//    const mainArrayRef = useRef<Konva.Group>(null);
//
//    const pivot1GroupRef = useRef<Konva.Group>(null);
//    const rightArrayPivotRef = useRef<Konva.Group>(null);
//    const leftArrayPivotRef = useRef<Konva.Group>(null);
//
//    const leftH1Ref = useRef<(Konva.Group | null)[]>([]);
//    const leftH2Ref = useRef<(Konva.Group | null)[]>([]);
//
//
//    const [singlePivot, setSinglePivot] = useState<rectInfo>(exRect);
//
//    const [leftArray, setLeftArray] = useState<rectInfo[]>([]);
//    const [rightArray, setRightArray] = useState<rectInfo[]>([]);
//
//    const [leftArrayUpdated, setLeftArrayUpdated] = useState<rectInfo[]>([]);
//    const [rightArrayUpdated, setRightArrayUpdated] = useState<rectInfo[]>([]);
//    const [rightXpos, setRightXPos] = useState<number[]>([]);
//    const [leftXpos, setLeftXpos] = useState<number[]>([]);
//
//    const compareRefArray = useRef<(Konva.Group | null)[]>([]);
//    const leftArrayRef = useRef<(Konva.Group | null)[]>([]);
//    const rightArrayRef = useRef<(Konva.Group | null)[]>([]);
//
//
//    const [leftArrayPivot, setLeftArrayPivot] = useState<rectInfo>(exRect);
//    const [rightArrayPivot, setRightArrayPivot] = useState<rectInfo>(exRect);
//
//
//
//    const compareLeftRefArray = useRef<(Konva.Group | null)[]>([]);
//
//
//    const [leftH1, setLeftH1] = useState<rectInfo[]>([]);
//    const [leftH2, setLeftH2] = useState<rectInfo[]>([]);
//
//    const [rightH1, setRightH1] = useState<rectInfo[]>([]);
//
//
//    //const [finalLeftArrayPos, setFinalLeftArrayPos] = useState<Vector2d[]>([]);
//    //const [finalrightArrayPos, setFinalRightArrayPos] = useState<Vector2d[]>([]);
//
//
//
//
//    const [arrayNoPivot, setArrayNoPivot] = useState<rectInfo[]>(props.boxesInfo.slice(0, props.boxesInfo.length - 1));
//
//    const [leftArrayNoPivot, setLeftArrayNoPivot] = useState<rectInfo[]>(leftArrayUpdated.slice(0, leftArrayUpdated.length - 1));
//    const [rightArrayNoPivot, setRightArrayNoPivot] = useState<rectInfo[]>(rightArrayUpdated.slice(0, rightArrayUpdated.length - 1));
//
//    //console.log("Initial array no pivot: ", arrayNoPivot);
//
//    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));
//
//
//
//    const partitionArray = (
//        array: rectInfo[],
//        setLeft: (array: rectInfo[]) => void,
//        setRight: (array: rectInfo[]) => void) => {
//
//        const pivot: rectInfo = array[array.length - 1];
//        const leftArray: rectInfo[] = [];
//        const rightArray: rectInfo[] = [];
//
//        for (let i = 0; i < array.length - 1; i++) {
//
//
//            const rect: rectInfo = { ...array[i], node: null };
//
//
//            if (array[i].number > pivot.number) {
//                rightArray.push(rect);
//            } else {
//                leftArray.push(rect);
//            }
//
//
//        };
//
//        setLeft(leftArray);
//        setRight(rightArray);
//
//
//    };
//
//    interface positioningProps {
//        distanceLeft: {
//            low: number,
//            high: number
//        };
//        distanceRight: {
//            low: number,
//            high: number
//        };
//    };
//
//
//    function getLeftRightPositions(array: rectInfo[], pivot: rectInfo, props: positioningProps): { left: rectInfo[], right: rectInfo[] } {
//
//        const { distanceLeft, distanceRight } = props;
//        let leftLength = 0;
//        let rightLength = 0;
//
//        const leftArray: rectInfo[] = [];
//        const rightArray: rectInfo[] = [];
//
//        const rightXpos: number[] = [];
//        const leftXpos: number[] = [];
//        const rectWidth = array[0]?.width;
//        const spacing = rectWidth === 40 ? 46 : 40;
//
//
//        for (let i = 0; i < array.length - 1; i++) {
//            if (array[i].number > pivot.number) {
//                rightLength++;
//            } else {
//                leftLength++;
//            };
//            if (array[i].number > pivot.number) {
//                //---------------------ORIGINAL VALUE------------------
//                //const xPosition = (centerX + (340 - (rightLength * spacing)));
//                //const rect: rectInfo = { ...array[i], node: null, x: xPosition };
//                const rect: rectInfo = { ...array[i], node: null };
//                rightArray.push(rect);
//            } else {
//                //---------------------ORIGINAL VALUE------------------
//                //const xPosition = (centerX + (-340 + (leftLength * spacing)));
//                //const rect: rectInfo = { ...array[i], node: null, x: xPosition };
//                const rect: rectInfo = { ...array[i], node: null };
//                leftArray.push(rect);
//
//            }
//
//        };
//
//
//        //let spacingLeft = leftLength > 4 ? 290 : 300; //og 340
//        //let spacingRight = rightLength > 4 ? 290 : 300; //340
//        console.log("Right length: ", rightLength);
//
//        let spacingLeft = leftLength > 4 ? distanceLeft.high : distanceLeft.low;
//        let spacingRight = rightLength > 4 ? distanceRight.high : distanceLeft.low;
//
//        for (let i = 1; i <= rightLength; i++) {
//            const xPosition = centerX + (spacingRight - (i * spacing));
//            rightXpos.push(xPosition);
//
//        };
//
//        for (let i = 1; i <= leftLength; i++) {
//
//            const xPosition = centerX + (-spacingLeft + (i * spacing));
//            leftXpos.push(xPosition);
//        }
//
//
//        setRightXPos(rightXpos);
//        setLeftXpos(leftXpos);
//
//
//        const updatedLA: rectInfo[] = leftArray.map((rect, i) => ({ ...rect, x: leftXpos[i] }));
//        const updatedRA: rectInfo[] = rightArray.map((rect, i) => ({ ...rect, x: rightXpos[i] }));
//
//        const retThis = {
//            left: updatedLA,
//            right: updatedRA
//        };
//
//
//        //setLeftArrayUpdated(updatedLA);
//        //setRightArrayUpdated(updatedRA);
//
//        return retThis;
//
//    }
//
//
//
//    useEffect(() => {
//
//        const noPivot = props.boxesInfo.slice(0, props.boxesInfo.length - 1);
//        //const leftNoPivot = leftArrayUpdated.slice(0, leftArrayUpdated.length - 1);
//        //const rightNoPivot = rightArrayUpdated.slice(0, rightArrayUpdated.length - 1);
//
//
//        const { leftArray, rightArray } = (() => { 
//            const pivot = props.boxesInfo[props.boxesInfo.length - 1];
//            const leftArrayV1: rectInfo[] = [];
//            const rightArrayV1: rectInfo[] = [];
//
//            for (let i = 0; i < props.boxesInfo.length - 1; i++) {
//                const rect: rectInfo = { ...props.boxesInfo[i], node: null };
//                if (pivot.number > rect.number || pivot.number === rect.number) {
//                    leftArrayV1.push(rect)
//                } else {
//                    rightArrayV1.push(rect);
//                }
//            };
//
//
//            const leftArray: rectInfo[] = leftArrayV1.map((rect, i) => ({ ...rect, node: leftArrayRef.current[i] }));
//            const rightArray: rectInfo[] = rightArrayV1.map((rect, i) => ({ ...rect, node: rightArrayRef.current[i] }));
//
//
//            return { leftArray, rightArray };
//
//
//        })();
//
//        const leftNoPivot = leftArray.slice(0, leftArray.length - 1);
//        const rightNoPivot = rightArray.slice(0, rightArray.length - 1);
//
//
//
//        setArrayNoPivot(noPivot);
//
//        setLeftArrayNoPivot(leftNoPivot);
//        setRightArrayNoPivot(rightNoPivot);
//
//        const mainArrayPositioning: positioningProps = {
//            distanceLeft: {
//                low: 300,
//                high: 290,
//            },
//            distanceRight: {
//                low: 300,
//                high: 290,
//            }
//        }
//
//
//        const { left: leftUpdated, right: rightUpdated } = getLeftRightPositions(props.boxesInfo, props.boxesInfo[props.boxesInfo.length - 1], mainArrayPositioning);
//        setLeftArrayUpdated(leftUpdated);
//        setRightArrayUpdated(rightUpdated);
//
//        //testing GROUND
//        //fix this tom (fixing now)
//
//        const { lH1, lH2 } = (() => {
//            // pivot = last element of leftNoPivot
//            const pivot = leftArray[leftArray.length - 1];
//            const lH1Raw: rectInfo[] = [];
//            const lH2Raw: rectInfo[] = [];
//
//            let pivotFirstOccurence: boolean = true;
//            for (let i = 0; i < leftArray.length; i++) {
//                const rect: rectInfo = { ...leftArray[i], node: null };
//                if (rect.number === pivot.number && pivotFirstOccurence === true) {
//                    pivotFirstOccurence = false;
//                    continue;
//                }
//
//                if (rect.number < pivot.number || rect.number === pivot.number && pivotFirstOccurence === false) {
//                    lH1Raw.push(rect);
//                }
//                else if (rect.number > pivot.number) {
//                    lH2Raw.push(rect);
//                }
//            }
//
//            // if you want to also attach refs, just like your reference code
//            const lH1: rectInfo[] = lH1Raw.map((rect, i) => ({
//                ...rect,
//                node: leftH1Ref.current[i]
//            }));
//
//            const lH2: rectInfo[] = lH2Raw.map((rect, i) => ({
//                ...rect,
//                node: leftH2Ref.current[i]
//            }));
//
//            return { lH1, lH2 };
//        })();
//
//
//        const HPositioning: positioningProps = {
//            distanceLeft: {
//                low: 20,
//                high: 10,
//            },
//            distanceRight: {
//                low: 20,
//                high: 10,
//            }
//        }
//
//        //const { left: leftH1Updated, right: rightH1Updated } = getLeftRightPositions(leftH1, leftH1[leftH1.length - 1], HPositioning);
//        console.log("LH1: ", lH1);
//        console.log("LH2: ", lH2);
//
//        setLeftH1(lH1);
//        setLeftH2(lH2);
//
//
//
//
//
//
//
//
//
//
//    }, [props.boxesInfo]);
//
//
//
//
//    const minRightX = Math.min(...rightArrayUpdated.map((r) => r.x));
//    const maxRightX = Math.max(...rightArrayUpdated.map((r) => r.x));
//    const rightCenterX = (minRightX + maxRightX) / 2;
//
//    const minLeftX = Math.min(...leftArrayUpdated.map((r) => r.x));
//    const maxLeftX = Math.max(...leftArrayUpdated.map((r) => r.x));
//
//    const leftCenterX = (minLeftX + maxLeftX) / 2;
//
//
//    const minLeftH1X = Math.min(...leftH1.map((r) => r.x));
//    const maxLeftH1X = Math.max(...leftH1.map((r) => r.x));
//
//    const leftH1CenterX = (minLeftH1X + maxLeftH1X) / 2;
//
//
//
//
//    useEffect(() => {
//        if (props.isAnimating === "animating") {
//            const duration: number = 1350;
//
//            (async () => {
//
//
//                await animateScale(props.boxesInfo, props.setBoxesInfo, setSinglePivot);
//
//            })();
//
//
//        }
//    }, [props.isAnimating]);
//
//
//
//
//    console.log("Main array: ", props.boxesInfo);
//
//    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
//        <Layer>
//
//            {/*Main array to be sorted */}
//            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />
//            {/*Selected Pivot*/}
//
//
//        </Layer>
//    </Stage >)
//
//}
//
//
import React, { useEffect, useRef } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import { RectangleRendererScale } from "../../../RENDERER/Renderer";
import { animateTo } from "../HELPER_FUNCTION/animation.helper";


type QuickPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
};

interface QuickSortProps {
    props: QuickPayload;
}


type QuickSortOp =
    | { type: "compare"; i: number; j: number }
    | { type: "swap"; i: number; j: number }
    | { type: "pivot"; index: number; finalIndex: number };


function getQuickSortOps(arr: number[]): QuickSortOp[] {
    const ops: QuickSortOp[] = [];

    function partition(low: number, high: number): number {
        const pivot = arr[high];
        let i = low;

        for (let j = low; j < high; j++) {
            ops.push({ type: "compare", i: j, j: high });
            if (arr[j] < pivot) {
                ops.push({ type: "swap", i, j });
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }

        ops.push({ type: "swap", i, j: high });
        [arr[i], arr[high]] = [arr[high], arr[i]];
        ops.push({ type: "pivot", index: high, finalIndex: i });
        return i;
    }

    function quickSort(low: number, high: number) {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, arr.length - 1);
    return ops;
}


async function animateQuickSortOps(
    ops: QuickSortOp[],
    rects: rectInfo[],
    setRects: React.Dispatch<React.SetStateAction<rectInfo[]>>
) {
    for (const op of ops) {
        if (op.type === "compare") {
            setRects(prev =>
                prev.map((r, idx) =>
                    idx === op.i || idx === op.j ? { ...r, color: "red" } : { ...r, color: "blue" }
                )
            );
            await new Promise(res => setTimeout(res, 300));
        }

        if (op.type === "swap") {
            setRects(prev => {
                const newRects = [...prev];
                const temp = newRects[op.i];
                newRects[op.i] = { ...newRects[op.j], x: temp.x };
                newRects[op.j] = { ...temp, x: newRects[op.j].x };
                return newRects;
            });
            await new Promise(res => setTimeout(res, 600));
        }

        if (op.type === "pivot") {
            setRects(prev =>
                prev.map((r, idx) =>
                    idx === op.finalIndex ? { ...r, color: "green" } : r
                )
            );
            await new Promise(res => setTimeout(res, 800));
        }
    }
}




export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    useEffect(() => {
        if (props.isAnimating === "animating") {
            const values = props.boxesInfo.map(r => r.number);
            const ops = getQuickSortOps([...values]);

            console.log("Operation: ", ops);

            (async () => {
                await animateQuickSortOps(ops, props.boxesInfo, props.setBoxesInfo);
                props.setIsAnimating?.("done");
            })();
        }
    }, [props.isAnimating]);



    return (
        <Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">
            <Layer>
                <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={props.konvaHeight! / 2} />
            </Layer>
        </Stage>
    );
};

import { Stage, Layer, } from "react-konva"
import type React from "react";
import { useEffect, useRef, useState, } from "react";
import Konva from "konva";
import { RectangleRenderer, SortRectangleRenderer } from "../../../RENDERER/Renderer";
import { mergeStore } from "./STORE/merge.store";
import { animateTo, animateSort } from "../HELPER_FUNCTION/animation.helper";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface";

const middle_x = window.innerWidth / 2;
const middle_y = window.innerHeight / 2;


type KonvaProps = {
    x: number,
    y: number,
    boxesInfo: Array<rectInfo>,
    rectCount: number,
    copyArray?: Array<rectInfo>
    isAnimating?: animation,
    setIsAnimating: (animate: animation) => void,
    animationControllerRef: React.RefObject<{ shouldStop: boolean }>
    konvaWidth?: number,
    konvaHeight?: number,

}

//const konvaWidth: number = 655;
const konvaHeight: number = 420;

type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number,
    offsetY: number,
    opacity?: number,


};

function splitHalf(array: rectInfo[], side: "left" | "right") {
    const mid = Math.floor(array.length / 2);
    return side === "left" ? array.slice(0, mid) : array.slice(mid);
}


function mergeArray(array1: rectInfo[], array2: rectInfo[]) {
    return [...array1, ...array2];
}


async function fadeEffect(func: (num: number) => void, steps = 30, action: "in" | "out"): Promise<void> {
    return new Promise((resolve) => {
        for (let i = 0; i <= 10; i++) {
            let progress = i / 10;
            setTimeout(() => {
                func(action === "in" ? progress : 1 - progress)
                if (i === 10) resolve();
            }, i * steps)
        }
    })
}

function sortArrayNumbers(array: rectInfo[]) {
    const sortedNumber = array.map(r => r.number).sort((a, b) => a! - b!);
    return array.map((r, i) => ({ ...r, number: sortedNumber[i] }));
};

function splitAndSort(arr: rectInfo[], direction: "left" | "right") {
    const half = splitHalf(arr, direction);
    return { half, sorted: sortArrayNumbers(half) };
}


export const MergeSortKonva: React.FC<KonvaProps> = ({ boxesInfo, isAnimating, setIsAnimating, animationControllerRef, konvaWidth,
    konvaHeight
}) => {


    const right = mergeStore((state: any) => state.right);
    const setRight = mergeStore((state: any) => state.setRight);
    const left = mergeStore((state: any) => state.left);
    const setLeft = mergeStore((state: any) => state.setLeft);

    const mainArray = mergeStore((state: any) => state.mainArray);
    const setMainArray = mergeStore((state: any) => state.setMainArray);
    const finalSortedArray = mergeStore((state: any) => state.finalSortedArray);
    const setFinalSortedArray = mergeStore((state: any) => state.setFinalSortedArray);


    const [opacity1, setOpacity1] = useState<number>(1);
    const [opacity2, setOpacity2] = useState<number>(0);
    const [opacity3, setOpacity3] = useState<number>(0);
    const [opacity4, setOpacity4] = useState<number>(0);


    const sortedLeft = mergeStore((state: any) => state.sortedLeft);
    const setSortedLeft = mergeStore((state: any) => state.setSortedLeft);

    const sortedRight = mergeStore((state: any) => state.sortedRight);
    const setSortedRight = mergeStore((state: any) => state.setSortedRight);

    const movingSortedL = mergeStore((state: any) => state.movingSortedL);
    const setMovingSortedL = mergeStore((state: any) => state.setMovingSortedL);

    const movingSortedR = mergeStore((state: any) => state.movingSortedR);
    const setMovingSortedR = mergeStore((state: any) => state.setMovingSortedR);





    const leftH1 = mergeStore((state: any) => state.leftH1);
    const setLeftH1 = mergeStore((state: any) => state.setLeftH1);
    const leftH2 = mergeStore((state: any) => state.leftH2);
    const setLeftH2 = mergeStore((state: any) => state.setLeftH2);
    const rightH1 = mergeStore((state: any) => state.rightH1);
    const setRightH1 = mergeStore((state: any) => state.setRightH1);
    const rightH2 = mergeStore((state: any) => state.rightH2);
    const setRightH2 = mergeStore((state: any) => state.setRightH2);


    const sortedLeftH1 = mergeStore((state: any) => state.sortedLeftH1);
    const setSortedLeftH1 = mergeStore((state: any) => state.setSortedLeftH1);
    const sortedLeftH2 = mergeStore((state: any) => state.sortedLeftH2);
    const setSortedLeftH2 = mergeStore((state: any) => state.setSortedLeftH2);
    const sortedRightH1 = mergeStore((state: any) => state.sortedRightH1);
    const setSortedRightH1 = mergeStore((state: any) => state.setSortedRightH1);
    const sortedRightH2 = mergeStore((state: any) => state.sortedRightH2);
    const setSortedRightH2 = mergeStore((state: any) => state.setSortedRightH2);


    const toBeSortedLeftH1 = mergeStore((state: any) => state.toBeSortedLeftH1);
    const setToBeSortedLeftH1 = mergeStore((state: any) => state.setToBeSortedLeftH1);
    const toBeSortedLeftH2 = mergeStore((state: any) => state.toBeSortedLeftH2);
    const setToBeSortedLeftH2 = mergeStore((state: any) => state.setToBeSortedLeftH2);
    const toBeSortedRightH1 = mergeStore((state: any) => state.toBeSortedRightH1);
    const setToBeSortedRightH1 = mergeStore((state: any) => state.setToBeSortedRightH1);
    const toBeSortedRightH2 = mergeStore((state: any) => state.toBeSortedRightH2);
    const setToBeSortedRightH2 = mergeStore((state: any) => state.setToBeSortedRightH2);


    function generateArray() {
        const finalSortedArray = sortArrayNumbers([...boxesInfo]);
        setMainArray([...boxesInfo]);
        setFinalSortedArray(finalSortedArray);

        const { half: lArray, sorted: finalSortedLeft } = splitAndSort([...boxesInfo], "left");
        const { half: rArray, sorted: finalSortedRight } = splitAndSort([...boxesInfo], "right");

        setLeft([...lArray]);
        setRight([...rArray]);

        const { half: lArrayH1, sorted: finalSortedH1 } = splitAndSort([...lArray], "left");
        const { half: lArrayH2, sorted: finalSortedH2 } = splitAndSort([...lArray], "right");

        setLeftH1([...lArrayH1]);
        setLeftH2([...lArrayH2]);
        setSortedLeftH1([...finalSortedH1]);
        setSortedLeftH2([...finalSortedH2]);
        setToBeSortedLeftH1([...lArrayH1]);
        setToBeSortedLeftH2([...lArrayH2]);

        const { half: rArrayH1, sorted: finalRightSortedH1 } = splitAndSort([...rArray], "left");
        const { half: rArrayH2, sorted: finalRightSortedH2 } = splitAndSort([...rArray], "right");

        setRightH1([...rArrayH1]);
        setRightH2([...rArrayH2]);
        setSortedRightH1([...finalRightSortedH1]);
        setSortedRightH2([...finalRightSortedH2]);
        setToBeSortedRightH1([...rArrayH1]);
        setToBeSortedRightH2([...rArrayH2]);

        setSortedLeft(mergeArray([...finalSortedH1], [...finalSortedH2]));
        setSortedRight(mergeArray([...finalRightSortedH1], [...finalRightSortedH2]));
        setMovingSortedL([...finalSortedLeft]);
        setMovingSortedR([...finalSortedRight]);
        setFinalSortedArray(mergeArray([...finalSortedLeft], [...finalSortedRight]));

        animationControllerRef.current.shouldStop = false;
    }


    useEffect(() => {
        generateArray();
    }, [boxesInfo]);

    //left
    const sortedLeftRef = useRef<Konva.Group>(null);
    const leftGroupRef = useRef<Konva.Group>(null);
    const leftH1Ref = useRef<Konva.Group>(null);
    const leftH2Ref = useRef<Konva.Group>(null);
    const toBeSortLH1Ref = useRef<Konva.Group>(null);
    const toBeSortLH2Ref = useRef<Konva.Group>(null);
    const sortedLeftH1Ref = useRef<Konva.Group>(null);
    const sortedLeftH2Ref = useRef<Konva.Group>(null);
    const movingSortedLRef = useRef<Konva.Group>(null);

    //right
    const sortedRightRef = useRef<Konva.Group>(null);
    const rightGroupRef = useRef<Konva.Group>(null);
    const rightH1Ref = useRef<Konva.Group>(null);
    const rightH2Ref = useRef<Konva.Group>(null);
    const toBeSortRH1Ref = useRef<Konva.Group>(null);
    const toBeSortRH2Ref = useRef<Konva.Group>(null);
    const sortedRightH1Ref = useRef<Konva.Group>(null);
    const sortedRightH2Ref = useRef<Konva.Group>(null);
    const movingSortedRRef = useRef<Konva.Group>(null)


    const finalSortedArrayRef = useRef<Konva.Group>(null);
    const resetAllRefPositions = () => {
        const refs = [
            leftGroupRef, rightGroupRef, finalSortedArrayRef,
            leftH1Ref, leftH2Ref, toBeSortLH1Ref, toBeSortLH2Ref,
            sortedLeftH1Ref, sortedLeftH2Ref, sortedLeftRef, sortedRightRef,
            movingSortedLRef, movingSortedRRef, rightH1Ref, rightH2Ref,
            toBeSortRH1Ref, toBeSortRH2Ref, sortedRightH1Ref, sortedRightH2Ref,


        ];

        refs.forEach(ref => {
            if (ref.current) {
                ref.current.stopDrag();
                ref.current.to({
                    x: 0,
                    y: 0,
                    duration: 0
                })
            }
        });
        setOpacity1(1);
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(0);

        setTimeout(() => {
            animationControllerRef.current.shouldStop = false;
        }, 100);




    }





    useEffect(() => {
        if (isAnimating === "idle") {
            resetAllRefPositions();
        }
    }, [isAnimating]);

    useEffect(() => {


        if (isAnimating === "animating" && leftGroupRef.current && leftH1Ref.current && leftH2Ref.current) {
            const duration = 1350;


            if (konvaWidth! >= 650) {
                (async () => {

                    if (animationControllerRef.current.shouldStop) return;

                    finalSortedArrayRef.current!.x(0);
                    finalSortedArrayRef.current!.y(390);



                    leftH1Ref.current!.x(-50);
                    leftH2Ref.current!.x(-50);
                    toBeSortLH1Ref.current!.x(-100);
                    toBeSortLH2Ref.current!.x(-70);
                    sortedLeftH1Ref.current!.x(-100);
                    sortedLeftH2Ref.current!.x(-70);

                    sortedLeftRef.current!.x(-50);
                    sortedLeftRef.current!.y(320);

                    sortedRightRef.current!.y(320);
                    sortedRightRef.current!.x(50);

                    movingSortedLRef.current!.x(-50);
                    movingSortedLRef.current!.y(320);

                    movingSortedRRef.current!.x(50);
                    movingSortedRRef.current!.y(320);




                    await animateTo(leftGroupRef.current, { y: 120 }, duration, { originX: 0, originY: 50 });
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(leftGroupRef.current, { x: -50 }, duration, { originX: 0, originY: 50 });
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(leftH1Ref.current, { y: 190 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                        animateTo(leftH2Ref.current, { y: 190 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(leftH1Ref.current, { x: -100 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                        animateTo(leftH2Ref.current, { x: -70 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortLH1Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 }),
                        animateTo(toBeSortLH2Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 })

                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortLH1Ref.current, { x: -100 }, duration, { originX: 0, originY: 190 }),
                        animateTo(toBeSortLH2Ref.current, { x: -70 }, duration, { originX: 0, originY: 190 }),


                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateSort(toBeSortedLeftH1, 800),
                        animateSort(toBeSortedLeftH2, 800),
                        animateSort(toBeSortedRightH1, 800),
                        animateSort(toBeSortedRightH2, 800)
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(sortedLeftH1Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                        animateTo(sortedLeftH2Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                        animateTo(sortedRightH1Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                        animateTo(sortedRightH2Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),

                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(sortedLeftH1Ref.current, { x: -50 }, duration, { originX: 0, originY: 190 }),
                        animateTo(sortedLeftH2Ref.current, { x: -50 }, duration, { originX: 0, originY: 190 }),
                        animateTo(sortedRightH1Ref.current, { x: 50 }, duration, { originX: 0, originY: 260 }),
                        animateTo(sortedRightH2Ref.current, { x: 50 }, duration, { originX: 0, originY: 260 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;


                    //out
                    await fadeEffect(setOpacity1, 30, "out");
                    if (animationControllerRef.current.shouldStop) return;

                    //in
                    await fadeEffect(setOpacity2, 30, "in");
                    if (animationControllerRef.current.shouldStop) return;


                    await Promise.all([
                        animateSort(sortedLeft, 800),
                        animateSort(sortedRight, 800)
                    ])
                    if (animationControllerRef.current.shouldStop) return;

                    //in
                    await fadeEffect(setOpacity3, 30, "in");
                    if (animationControllerRef.current.shouldStop) return;



                    await Promise.all([
                        animateTo(movingSortedLRef.current, { y: 390 }, duration, { originX: 0, originY: 320 }),
                        animateTo(movingSortedRRef.current, { y: 390 }, duration, { originX: 0, originY: 320 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(movingSortedLRef.current, { x: 0 }, duration, { originX: 0, originY: 320 });
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(movingSortedRRef.current, { x: 0 }, duration, { originX: 0, originY: 320 })
                    if (animationControllerRef.current.shouldStop) return;

                    //out
                    await fadeEffect(setOpacity3, 20, "out");
                    if (animationControllerRef.current.shouldStop) return;

                    //in
                    await fadeEffect(setOpacity4, 20, "in");
                    if (animationControllerRef.current.shouldStop) return;

                    if (finalSortedArrayRef.current) {
                        finalSortedArrayRef.current.x(0);
                        finalSortedArrayRef.current.y(390);
                    }


                    await animateSort(finalSortedArray, 800);

                    if (!animationControllerRef.current.shouldStop) {
                        setIsAnimating("done");
                    };

                    return () => {

                        animationControllerRef.current.shouldStop = true;
                    };




                })();
            } else {
                // 🔹 Mobile / Small Screens (max 6 rects, tighter spacing)
                (async () => {
                    if (animationControllerRef.current.shouldStop) return;

                    finalSortedArrayRef.current!.x(0);
                    finalSortedArrayRef.current!.y(260);

                    leftH1Ref.current!.x(-20);
                    leftH2Ref.current!.x(-20);
                    toBeSortLH1Ref.current!.x(-50);
                    toBeSortLH2Ref.current!.x(-30);
                    sortedLeftH1Ref.current!.x(-50);
                    sortedLeftH2Ref.current!.x(-30);

                    sortedLeftRef.current!.x(-20);
                    sortedLeftRef.current!.y(220);

                    sortedRightRef.current!.y(220);
                    sortedRightRef.current!.x(20);

                    movingSortedLRef.current!.x(-20);
                    movingSortedLRef.current!.y(220);

                    movingSortedRRef.current!.x(20);
                    movingSortedRRef.current!.y(220);


                    await animateTo(leftGroupRef.current, { y: 100 }, duration, { originX: 0, originY: 40 });
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(leftGroupRef.current, { x: -20 }, duration, { originX: 0, originY: 40 });
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(leftH1Ref.current, { y: 140 }, duration, { originX: 0, originY: 100 }),
                        animateTo(leftH2Ref.current, { y: 140 }, duration, { originX: 0, originY: 100 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(leftH1Ref.current, { x: -50 }, duration, { originX: 0, originY: 100 }),
                        animateTo(leftH2Ref.current, { x: -30 }, duration, { originX: 0, originY: 100 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortLH1Ref.current, { y: 180 }, duration, { originX: 0, originY: 140 }),
                        animateTo(toBeSortLH2Ref.current, { y: 180 }, duration, { originX: 0, originY: 140 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortLH1Ref.current, { x: -50 }, duration, { originX: 0, originY: 140 }),
                        animateTo(toBeSortLH2Ref.current, { x: -30 }, duration, { originX: 0, originY: 140 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateSort(toBeSortedLeftH1, 800),
                        animateSort(toBeSortedLeftH2, 800),
                        animateSort(toBeSortedRightH1, 800),
                        animateSort(toBeSortedRightH2, 800),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(sortedLeftH1Ref.current, { y: 220 }, duration, { originX: 0, originY: 180 }),
                        animateTo(sortedLeftH2Ref.current, { y: 220 }, duration, { originX: 0, originY: 180 }),
                        animateTo(sortedRightH1Ref.current, { y: 220 }, duration, { originX: 0, originY: 180 }),
                        animateTo(sortedRightH2Ref.current, { y: 220 }, duration, { originX: 0, originY: 180 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(sortedLeftH1Ref.current, { x: -20 }, duration, { originX: 0, originY: 220 }),
                        animateTo(sortedLeftH2Ref.current, { x: -20 }, duration, { originX: 0, originY: 220 }),
                        animateTo(sortedRightH1Ref.current, { x: 20 }, duration, { originX: 0, originY: 220 }),
                        animateTo(sortedRightH2Ref.current, { x: 20 }, duration, { originX: 0, originY: 220 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;



                    await fadeEffect(setOpacity1, 30, "out");
                    if (animationControllerRef.current.shouldStop) return;

                    await fadeEffect(setOpacity2, 30, "in");
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateSort(sortedLeft, 800),
                        animateSort(sortedRight, 800),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await fadeEffect(setOpacity3, 30, "in");
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(movingSortedLRef.current, { y: 260 }, duration, { originX: 0, originY: 220 }),
                        animateTo(movingSortedRRef.current, { y: 260 }, duration, { originX: 0, originY: 220 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(movingSortedLRef.current, { x: 0 }, duration, { originX: 0, originY: 220 });
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(movingSortedRRef.current, { x: 0 }, duration, { originX: 0, originY: 220 });
                    if (animationControllerRef.current.shouldStop) return;

                    await fadeEffect(setOpacity3, 30, "out");
                    if (animationControllerRef.current.shouldStop) return;

                    await fadeEffect(setOpacity4, 30, "in");
                    if (animationControllerRef.current.shouldStop) return;

                    if (finalSortedArrayRef.current) {
                        finalSortedArrayRef.current.x(0);
                        finalSortedArrayRef.current.y(260);
                    }

                    await animateSort(finalSortedArray, 800);

                    if (!animationControllerRef.current.shouldStop) {
                        setIsAnimating("done");



                    }
                })();

            }





        };




        if (isAnimating === "animating" && rightGroupRef.current && rightH1Ref.current && rightH2Ref.current) {
            const duration = 1350;

            if (konvaWidth! >= 650) {

                (async () => {
                    if (animationControllerRef.current.shouldStop) return;

                    rightH1Ref.current!.x(50);
                    rightH2Ref.current!.x(50);
                    toBeSortRH1Ref.current!.x(80);
                    toBeSortRH2Ref.current!.x(110);
                    sortedRightH1Ref.current!.x(80);
                    sortedRightH2Ref.current!.x(110);
                    sortedRightRef.current!.x(50);


                    await animateTo(rightGroupRef.current, { y: 120 }, duration, { originX: 0, originY: 50 });
                    if (animationControllerRef.current.shouldStop) return;
                    await animateTo(rightGroupRef.current, { x: 50 }, duration, { originX: 0, originY: 50 });
                    if (animationControllerRef.current.shouldStop) return;


                    await Promise.all([
                        animateTo(rightH1Ref.current, { y: 190 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                        animateTo(rightH2Ref.current, { y: 190 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(rightH1Ref.current, { x: 80 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                        animateTo(rightH2Ref.current, { x: 110 }, duration, {
                            originX: 0,
                            originY: 120,
                        }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortRH1Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 }),
                        animateTo(toBeSortRH2Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 })
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortRH1Ref.current, { x: 80 }, duration, { originX: 0, originY: 190 }),
                        animateTo(toBeSortRH2Ref.current, { x: 110 }, duration, { originX: 0, originY: 190 })
                    ]);
                    if (animationControllerRef.current.shouldStop) return;



                })();

            } else {
                const duration = 1350;
                (async () => {

                    rightH1Ref.current!.x(20);
                    rightH2Ref.current!.x(20);
                    toBeSortRH1Ref.current!.x(30);
                    toBeSortRH2Ref.current!.x(50);
                    sortedRightH1Ref.current!.x(30);
                    sortedRightH2Ref.current!.x(50);
                    sortedRightRef.current!.x(20);

                    await animateTo(rightGroupRef.current, { y: 100 }, duration, { originX: 0, originY: 40 });
                    if (animationControllerRef.current.shouldStop) return;

                    await animateTo(rightGroupRef.current, { x: 20 }, duration, { originX: 0, originY: 40 });
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(rightH1Ref.current, { y: 140 }, duration, { originX: 0, originY: 100 }),
                        animateTo(rightH2Ref.current, { y: 140 }, duration, { originX: 0, originY: 100 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(rightH1Ref.current, { x: 30 }, duration, { originX: 0, originY: 120 }),
                        animateTo(rightH2Ref.current, { x: 50 }, duration, { originX: 0, originY: 120 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortRH1Ref.current, { y: 180 }, duration, { originX: 0, originY: 140 }),
                        animateTo(toBeSortRH2Ref.current, { y: 180 }, duration, { originX: 0, originY: 140 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;

                    await Promise.all([
                        animateTo(toBeSortRH1Ref.current, { x: 30 }, duration, { originX: 0, originY: 140 }),
                        animateTo(toBeSortRH2Ref.current, { x: 50 }, duration, { originX: 0, originY: 140 }),
                    ]);
                    if (animationControllerRef.current.shouldStop) return;


                })();


            }




        }



    }, [isAnimating]);







    return (
        <Stage width={konvaWidth} height={konvaHeight} className={`w-full h-[95%]`}>
            <Layer>
                {/*Top Array*/}
                <RectangleRenderer array={boxesInfo} offsetX={0} offsetY={50} />

                {/* Left Subarray from the top Array (offsetX = -50, offsetY = 120)*/}
                <RectangleRenderer array={left} offsetX={0} offsetY={0} groupRef={leftGroupRef} />

                {/* Right Subarray from the top Array (offsetX = 50, offsetY = 120)*/}

                <RectangleRenderer array={right} offsetX={0} offsetY={0} groupRef={rightGroupRef} />

                {/* Left Subarray from the Left Subarray */}

                <RectangleRenderer array={leftH1} offsetX={-100} offsetY={190} groupRef={leftH1Ref} />

                {/* Right Subarray from the Left Subarray */}
                <RectangleRenderer array={leftH2} offsetX={-70} offsetY={190} groupRef={leftH2Ref} />

                {/* Left subarray from the Right Subarray */}
                <RectangleRenderer array={rightH1} offsetX={80} offsetY={190} groupRef={rightH1Ref} />

                {/* Right subarray from the Right Subarray */}
                <RectangleRenderer array={rightH2} offsetX={110} offsetY={190} groupRef={rightH2Ref} />

                {/*Top Array with spaces*/}
                {/*<RectangleRenderer array={rectArraySpaces} offsetX={0} offsetY={260} />*/}

                {/*To be sorted leftH1*/}

                <SortRectangleRenderer array={toBeSortedLeftH1} offsetX={-100} offsetY={260} groupRef={toBeSortLH1Ref} opacity={1}
                />

                {/*To be sorted leftH2*/}

                <SortRectangleRenderer array={toBeSortedLeftH2} offsetX={-100} offsetY={260} groupRef={toBeSortLH2Ref} opacity={1} />

                {/*To be sorted rightH1*/}
                <SortRectangleRenderer array={toBeSortedRightH1} offsetX={80} offsetY={260} groupRef={toBeSortRH1Ref} opacity={1} />

                {/*To be sorted rightH2*/}
                <SortRectangleRenderer array={toBeSortedRightH2} offsetX={110} offsetY={260} groupRef={toBeSortRH2Ref} opacity={1} />

                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}

                {/*Sorted left h1*/}
                <SortRectangleRenderer array={sortedLeftH1} offsetX={-100} offsetY={330} groupRef={sortedLeftH1Ref} opacity={opacity1} />

                {/*Sorted left h2*/}
                <SortRectangleRenderer array={sortedLeftH2} offsetX={-70} offsetY={320} groupRef={sortedLeftH2Ref} opacity={opacity1} />

                {/*Sorted right H1*/}
                <SortRectangleRenderer array={sortedRightH1} offsetX={80} offsetY={320} groupRef={sortedRightH1Ref} opacity={opacity1} />

                {/*Sorted right H2*/}
                <SortRectangleRenderer array={sortedRightH2} offsetX={110} offsetY={320} groupRef={sortedRightH2Ref} opacity={opacity1} />


                {/* Left Subarray from the Left Subarray (but sorted) */}
                <SortRectangleRenderer array={sortedLeft} offsetX={-50} offsetY={320} groupRef={sortedLeftRef} opacity={opacity2} />

                {/* Right Subarray from the Left Subarray (but sorted) */}
                <SortRectangleRenderer array={sortedRight} offsetX={50} offsetY={320} groupRef={sortedRightRef} opacity={opacity2} />

                {/* Moving sorted left array */}
                <SortRectangleRenderer array={movingSortedL} offsetX={-50} offsetY={320} groupRef={movingSortedLRef} opacity={opacity3} />

                {/* Moving sorted right array */}
                <SortRectangleRenderer array={movingSortedR} offsetX={50} offsetY={320} groupRef={movingSortedRRef} opacity={opacity3} />

                {/*the final fucking sorted array*/}
                <SortRectangleRenderer array={finalSortedArray} offsetX={0} offsetY={390} groupRef={finalSortedArrayRef} opacity={opacity4} />



            </Layer>
        </Stage>
    )



}





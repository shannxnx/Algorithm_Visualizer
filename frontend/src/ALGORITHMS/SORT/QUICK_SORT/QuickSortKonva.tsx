import React, { useEffect, useRef, useState } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage, } from "react-konva";
import {
    RectangleRenderer,
    RectangleRendererScale,
    SortRectangleRenderer,
    SingleRectangleRenderer,
    RectangleGroup
} from "../../../RENDERER/Renderer";
import Konva from "konva";
import { animateTo, animateScale, animationScaleSmooth, animatePartition, type partionProps, animatePartition2, animatePartition3 } from "../HELPER_FUNCTION/animation.helper";
import type { Vector2d } from "konva/lib/types";
import { getArrayCenterX } from "../HELPER_FUNCTION/helpter";





type QuickPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    animationControllerRef?: React.RefObject<{ shouldStop: boolean }>;
    konvaWidth?: number,
    konvaHeight?: number,
    setBoxesInfo: (array: rectInfo[]) => void;
};

interface QuickSortProps {
    props: QuickPayload
}

const exRect: rectInfo = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    number: 0,
    scaleX: 0,
    scaleY: 0
};


export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    const mainArrayRef = useRef<Konva.Group>(null);

    const pivot1GroupRef = useRef<Konva.Group>(null);
    const rightArrayPivotRef = useRef<Konva.Group>(null);
    const leftArrayPivotRef = useRef<Konva.Group>(null);

    const leftH1Ref = useRef<(Konva.Group | null)[]>([]);
    const leftH2Ref = useRef<(Konva.Group | null)[]>([]);


    const [singlePivot, setSinglePivot] = useState<rectInfo>(exRect);

    const [leftArray, setLeftArray] = useState<rectInfo[]>([]);
    const [rightArray, setRightArray] = useState<rectInfo[]>([]);

    const [leftArrayUpdated, setLeftArrayUpdated] = useState<rectInfo[]>([]);
    const [rightArrayUpdated, setRightArrayUpdated] = useState<rectInfo[]>([]);
    const [rightXpos, setRightXPos] = useState<number[]>([]);
    const [leftXpos, setLeftXpos] = useState<number[]>([]);

    const compareRefArray = useRef<(Konva.Group | null)[]>([]);
    const leftArrayRef = useRef<(Konva.Group | null)[]>([]);
    const rightArrayRef = useRef<(Konva.Group | null)[]>([]);


    const [leftArrayPivot, setLeftArrayPivot] = useState<rectInfo>(exRect);
    const [rightArrayPivot, setRightArrayPivot] = useState<rectInfo>(exRect);



    const compareLeftRefArray = useRef<(Konva.Group | null)[]>([]);


    const [leftH1, setLeftH1] = useState<rectInfo[]>([]);
    const [leftH2, setLeftH2] = useState<rectInfo[]>([]);

    const [rightH1, setRightH1] = useState<rectInfo[]>([]);


    //const [finalLeftArrayPos, setFinalLeftArrayPos] = useState<Vector2d[]>([]);
    //const [finalrightArrayPos, setFinalRightArrayPos] = useState<Vector2d[]>([]);




    const [arrayNoPivot, setArrayNoPivot] = useState<rectInfo[]>(props.boxesInfo.slice(0, props.boxesInfo.length - 1));

    const [leftArrayNoPivot, setLeftArrayNoPivot] = useState<rectInfo[]>(leftArrayUpdated.slice(0, leftArrayUpdated.length - 1));
    const [rightArrayNoPivot, setRightArrayNoPivot] = useState<rectInfo[]>(rightArrayUpdated.slice(0, rightArrayUpdated.length - 1));

    //console.log("Initial array no pivot: ", arrayNoPivot);

    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));



    const partitionArray = (
        array: rectInfo[],
        setLeft: (array: rectInfo[]) => void,
        setRight: (array: rectInfo[]) => void) => {

        const pivot: rectInfo = array[array.length - 1];
        const leftArray: rectInfo[] = [];
        const rightArray: rectInfo[] = [];

        for (let i = 0; i < array.length - 1; i++) {


            const rect: rectInfo = { ...array[i], node: null };


            if (array[i].number > pivot.number) {
                rightArray.push(rect);
            } else {
                leftArray.push(rect);
            }


        };

        setLeft(leftArray);
        setRight(rightArray);


    };



    function getLeftRightPositions(array: rectInfo[], pivot: rectInfo) {

        let leftLength = 0;
        let rightLength = 0;


        const leftArray: rectInfo[] = [];
        const rightArray: rectInfo[] = [];

        const rightXpos: number[] = [];
        const leftXpos: number[] = [];
        const rectWidth = array[0].width;
        const spacing = rectWidth === 40 ? 46 : 40;


        for (let i = 0; i < array.length - 1; i++) {



            if (array[i].number > pivot.number) {
                rightLength++;
            } else {
                leftLength++;
            };


            if (array[i].number > pivot.number) {
                //---------------------ORIGINAL VALUE------------------
                //const xPosition = (centerX + (340 - (rightLength * spacing)));
                //const rect: rectInfo = { ...array[i], node: null, x: xPosition };
                const rect: rectInfo = { ...array[i], node: null };
                rightArray.push(rect);


            } else {

                //---------------------ORIGINAL VALUE------------------
                //const xPosition = (centerX + (-340 + (leftLength * spacing)));
                //const rect: rectInfo = { ...array[i], node: null, x: xPosition };


                const rect: rectInfo = { ...array[i], node: null };
                leftArray.push(rect);

            }

        };


        let distanceLeft = leftLength > 4 ? 290 : 300; //og 340
        let distanceRight = rightLength > 4 ? 290 : 300; //340


        for (let i = 1; i <= rightLength; i++) {
            const xPosition = centerX + (distanceRight - (i * spacing));
            rightXpos.push(xPosition);

        };

        for (let i = 1; i <= leftLength; i++) {

            const xPosition = centerX + (-distanceLeft + (i * spacing));
            leftXpos.push(xPosition);
        }


        setRightXPos(rightXpos);
        setLeftXpos(leftXpos);


        const updatedLA: rectInfo[] = leftArray.map((rect, i) => ({ ...rect, x: leftXpos[i] }));
        const updatedRA: rectInfo[] = rightArray.map((rect, i) => ({ ...rect, x: rightXpos[i] }));

        setLeftArrayUpdated(updatedLA);
        setRightArrayUpdated(updatedRA);


    }



    useEffect(() => {

        const noPivot = props.boxesInfo.slice(0, props.boxesInfo.length - 1);
        //const leftNoPivot = leftArrayUpdated.slice(0, leftArrayUpdated.length - 1);
        //const rightNoPivot = rightArrayUpdated.slice(0, rightArrayUpdated.length - 1);


        const { leftArray, rightArray } = (() => {
            const pivot = props.boxesInfo[props.boxesInfo.length - 1];
            const leftArrayV1: rectInfo[] = [];
            const rightArrayV1: rectInfo[] = [];

            for (let i = 0; i < props.boxesInfo.length - 1; i++) {
                const rect: rectInfo = { ...props.boxesInfo[i], node: null };
                if (pivot.number > rect.number || pivot.number === rect.number) {
                    leftArrayV1.push(rect)
                } else {
                    rightArrayV1.push(rect);
                }
            };


            const leftArray: rectInfo[] = leftArrayV1.map((rect, i) => ({ ...rect, node: leftArrayRef.current[i] }));
            const rightArray: rectInfo[] = rightArrayV1.map((rect, i) => ({ ...rect, node: rightArrayRef.current[i] }));


            return { leftArray, rightArray };


        })();

        const leftNoPivot = leftArray.slice(0, leftArray.length - 1);
        const rightNoPivot = rightArray.slice(0, rightArray.length - 1);



        setArrayNoPivot(noPivot);

        setLeftArrayNoPivot(leftNoPivot);
        setRightArrayNoPivot(rightNoPivot);

        getLeftRightPositions(props.boxesInfo, props.boxesInfo[props.boxesInfo.length - 1]);

        //testing GROUND
        //fix this tom (fixing now)

        const { lH1, lH2 } = (() => {
            // pivot = last element of leftNoPivot
            const pivot = leftArray[leftArray.length - 1];
            const lH1Raw: rectInfo[] = [];
            const lH2Raw: rectInfo[] = [];

            let pivotFirstOccurence: boolean = true;
            for (let i = 0; i < leftArray.length; i++) {
                const rect: rectInfo = { ...leftArray[i], node: null };
                if (rect.number === pivot.number && pivotFirstOccurence === true) {
                    pivotFirstOccurence = false;
                    continue;
                }

                if (rect.number < pivot.number || rect.number === pivot.number && pivotFirstOccurence === false) {
                    lH1Raw.push(rect);
                }
                else if (rect.number > pivot.number) {
                    lH2Raw.push(rect);
                }
            }

            // if you want to also attach refs, just like your reference code
            const lH1: rectInfo[] = lH1Raw.map((rect, i) => ({
                ...rect,
                node: leftH1Ref.current[i]
            }));

            const lH2: rectInfo[] = lH2Raw.map((rect, i) => ({
                ...rect,
                node: leftH2Ref.current[i]
            }));

            return { lH1, lH2 };
        })();

        console.log("LH1: ", lH1);
        console.log("LH2: ", lH2);

        setLeftH1(lH1);
        setLeftH2(lH2);










    }, [props.boxesInfo]);




    const minRightX = Math.min(...rightArrayUpdated.map((r) => r.x));
    const maxRightX = Math.max(...rightArrayUpdated.map((r) => r.x));
    const rightCenterX = (minRightX + maxRightX) / 2;

    const minLeftX = Math.min(...leftArrayUpdated.map((r) => r.x));
    const maxLeftX = Math.max(...leftArrayUpdated.map((r) => r.x));

    const leftCenterX = (minLeftX + maxLeftX) / 2;


    const minLeftH1X = Math.min(...leftH1.map((r) => r.x));
    const maxLeftH1X = Math.max(...leftH1.map((r) => r.x));

    const leftH1CenterX = (minLeftH1X + maxLeftH1X) / 2;


    //console.log("RightArrayUpdated: ", rightArrayUpdated);
    //console.log("Right Array no Pivot: ", rightArrayNoPivot);
    //console.log("Left Array no Pivot: ", leftArrayNoPivot);

    //console.log("LeftH1: ", leftH1);
    //console.log("LeftH2: ", leftH2);

    useEffect(() => {
        if (props.isAnimating === "animating") {
            const duration: number = 1350;

            (async () => {

                //--------------------------------------------------------------
                //PHASE - 1
                //--------------------------------------------------------------
                //finding pivot on the first array or the  main array
                let pivot = await animateScale(props.boxesInfo, props.setBoxesInfo, setSinglePivot);
                const partionProps: partionProps = {
                    array: arrayNoPivot,
                    pivot: pivot,
                    refs: compareRefArray.current,
                    duration,
                    destinationY: 100,
                    destinationX: centerX,
                    spacingLeft: leftArrayNoPivot.length >= 4 ? 290 : 300,                    //og value 340
                    spacingRight: rightArrayNoPivot.length >= 4 ? 290 : 300                    //og value 340
                };
                //pivot 1 going down
                //await animateTo(pivot1GroupRef.current, { y: 55 }, duration, { originX: 0, originY: 0 });

                await animateTo(pivot1GroupRef.current, { y: 100 }, duration, { originX: 0, originY: 50 });


                //Pivot 1 going center
                if (leftArrayNoPivot.length < 4 && rightArrayNoPivot.length < 4) {
                    await animateTo(pivot1GroupRef.current, { x: centerX }, duration, { originY: 100 });
                }


                //Pivot 1 where Pivot is the highest number
                else if (leftArrayNoPivot.length >= 4) {
                    await animateTo(pivot1GroupRef.current, { x: centerX + 100 }, duration, { originY: 100 });
                }

                //Pivot 2 where Pivot is the lowest number
                else if (rightArrayNoPivot.length >= 4) {
                    await animateTo(pivot1GroupRef.current, { x: centerX - 101 }, duration, { originY: 100 });
                }

                //partitioning the main array
                await animatePartition(partionProps);

                console.log("centerX: ", centerX);

                //-------------------------------------------------------------------------------------------------------
                //left array and right array going down (PHASE - 2)
                //-------------------------------------------------------------------------------------------------------
                await Promise.all(
                    //og {y : 150}
                    leftXpos.map((pos, i) => animateTo(leftArrayRef.current[i], { y: 200 }, duration, { originY: 100, originX: leftArrayUpdated[i].x }))
                )


                await Promise.all(
                    rightXpos.map((pos, i) => animateTo(rightArrayRef.current[i], { y: 200 }, duration, { originY: 100 }))

                );


                let leftPivot = await animateScale(leftArrayUpdated, setLeftArrayUpdated, setLeftArrayPivot);

                //console.log("---------------------------------------------");
                //console.log("leftArrayNoPivot in Props: ", leftArrayNoPivot);
                //console.log("---------------------------------------------")


                //this is for when all rects are less than the pivot!

                const partionLeft: partionProps = {
                    array: leftArrayUpdated,
                    pivot: leftPivot,
                    refs: leftArrayRef.current,
                    duration,
                    destinationY: 150,
                    destinationX: 200,
                    spacingLeft: 10,
                    spacingRight: 10,
                    originY: 200,
                    pivotDestinationX: leftH1.length < 5 ? leftCenterX : leftCenterX + 50,
                    pivotDestinationY: 150,
                    fromWhere: "Right",
                    spacing: 10
                };



                let rightPivot = await animateScale(rightArrayUpdated, setRightArrayUpdated, setRightArrayPivot);



                if (leftArrayUpdated.length >= 1) {
                    await animatePartition3(partionLeft);
                }

                const partionRight: partionProps = {
                    array: rightArrayUpdated,
                    pivot: rightPivot,
                    refs: rightArrayRef.current,
                    duration,
                    destinationY: 150,
                    destinationX: 200,
                    spacingLeft: 10,
                    spacingRight: 10,
                    originY: 200,
                    pivotDestinationX: rightH1.length < 5 ? rightCenterX : rightCenterX + 50,
                    pivotDestinationY: 150,
                    fromWhere: "Left",
                    spacing: 10
                };

                if (rightArrayUpdated.length >= 1) {
                    await animatePartition3(partionRight)
                };



                const partionLeftH1: partionProps = {
                    array: leftH1,
                    pivot: leftH1[leftH1.length - 1],
                    refs: leftH1Ref.current,
                    duration,
                    destinationY: 250,
                    destinationX: 200,
                    spacingLeft: 10,
                    spacingRight: 10,
                    originY: 200,
                    pivotDestinationX: leftH1.length < 5 ? leftH1CenterX : leftH1CenterX + 50,
                    pivotDestinationY: 200,
                    fromWhere: "Right",
                    spacing: 10
                };

                await animatePartition3(partionLeftH1)



                props.setIsAnimating?.("done");
            })();


        }
    }, [props.isAnimating]);



    //this is for debug only i think just to show me the absolute position of each rect node.
    //useEffect(() => {

    //    if (props.isAnimating === "done") {


    //        compareRefArray.current.map((node, i) => {
    //            if (node) {
    //                const pos = node.position();
    //                console.log(`After animation rect[${i}] position: `, pos);
    //            }
    //        })
    //    }
    //}, [props.isAnimating]);



    console.log("Main array: ", props.boxesInfo);

    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            {/*Main array to be sorted */}
            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />
            {/*Selected Pivot*/}
            <RectangleGroup rectInfo={singlePivot} groupRef={pivot1GroupRef}
                offsetX={props.boxesInfo.length > 6 ? -2 : 0} />


            {
                arrayNoPivot.map((rect, i) => <RectangleGroup rectInfo={rect} groupRef={(el) => { compareRefArray.current[i] = el }} key={i}
                    offsetX={props.boxesInfo.length > 6 ? -2 : 0} />)
            }


            {
                leftArrayUpdated.map((rect, i) => <RectangleGroup rectInfo={rect} key={i} offsetX={0} offsetY={0}
                    groupRef={(el) => {
                        leftArrayRef.current[i] = el
                        if (el) rect.node = el;
                    }}
                />)
            }

            {
                rightArrayUpdated.map((rect, i) => <RectangleGroup rectInfo={rect} key={i} offsetX={0} offsetY={0}
                    groupRef={(el) => {
                        rightArrayRef.current[i] = el;
                        if (el) rect.node = el;
                    }} />)
            }

            {
                leftH1.map((rect, i) => <RectangleGroup rectInfo={rect} key={i} offsetX={0} offsetY={0}
                    groupRef={(el) => {
                        leftH1Ref.current[i] = el;
                        if (el) rect.node = el;
                    }} />)
            }


            {/*
                <RectangleGroup rectInfo={rightArrayPivot} groupRef={rightArrayPivotRef} offsetX={props.boxesInfo.length > 6 ? -0.5 : 0} />
                <RectangleGroup rectInfo={leftArrayPivot} groupRef={leftArrayPivotRef} offsetX={props.boxesInfo.length > 6 ? -0.5 : 0} />
            */}

        </Layer>
    </Stage >)

}


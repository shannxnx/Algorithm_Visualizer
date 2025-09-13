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
import { animateTo, animateScale, animationScaleSmooth, animatePartition, type partionProps } from "../HELPER_FUNCTION/animation.helper";
import type { Vector2d } from "konva/lib/types";





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
    const [rightH1, setRightH1] = useState<rectInfo[]>([]);


    //const [finalLeftArrayPos, setFinalLeftArrayPos] = useState<Vector2d[]>([]);
    //const [finalrightArrayPos, setFinalRightArrayPos] = useState<Vector2d[]>([]);




    const [arrayNoPivot, setArrayNoPivot] = useState<rectInfo[]>(props.boxesInfo.slice(0, props.boxesInfo.length - 1));
    const [leftArrayNoPivot, setLeftArrayNoPivot] = useState<rectInfo[]>(leftArrayUpdated.slice(0, leftArrayUpdated.length - 1));
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
                const xPosition = centerX + (340 - (rightLength * spacing));
                const rect: rectInfo = { ...array[i], node: null, x: xPosition };
                rightArray.push(rect);
            } else {
                const xPosition = centerX + (-380 + (leftLength * spacing));
                const rect: rectInfo = { ...array[i], node: null, x: xPosition };


                leftArray.push(rect);
            }




        };

        for (let i = 1; i <= rightLength; i++) {
            const xPosition = centerX + (340 - (i * spacing));
            rightXpos.push(xPosition);

        };

        for (let i = 1; i <= leftLength; i++) {

            const xPosition = centerX + (-380 + (i * spacing));
            leftXpos.push(xPosition);
        }


        setRightXPos(rightXpos);
        setLeftXpos(leftXpos);

        setLeftArrayUpdated(leftArray);
        setRightArrayUpdated(rightArray);



    }



    useEffect(() => {

        const noPivot = props.boxesInfo.slice(0, props.boxesInfo.length - 1);
        const leftNoPivot = leftArrayUpdated.slice(0, leftArrayUpdated.length - 1);

        partitionArray(props.boxesInfo, setLeftArray, setRightArray);
        partitionArray(leftArrayUpdated, setLeftH1, setRightH1);

        setArrayNoPivot(noPivot);
        setLeftArrayNoPivot(leftNoPivot);

        getLeftRightPositions(props.boxesInfo, props.boxesInfo[props.boxesInfo.length - 1]);




    }, [props.boxesInfo]);

    //console.log("RightXPos: ", rightXpos);
    //console.log("LeftXPos: ", leftXpos);
    //console.log("Left array: ", leftArray);
    console.log("Left array(updated): ", leftArrayUpdated);
    console.log("Left array no pivot: ", leftArrayNoPivot);


    useEffect(() => {
        if (props.isAnimating === "animating") {
            const duration: number = 1350;

            (async () => {


                //finding pivot on the first array or the  main array
                let pivot = await animateScale(props.boxesInfo, props.setBoxesInfo, setSinglePivot);



                const partionProps: partionProps = {
                    array: arrayNoPivot,
                    pivot: pivot,
                    refs: compareRefArray.current,
                    centerX,
                    duration

                };



                //pivot 1 going down
                //await animateTo(pivot1GroupRef.current, { y: 55 }, duration, { originX: 0, originY: 0 });


                await animateTo(pivot1GroupRef.current, { y: 100 }, duration, { originX: 0, originY: 45 });

                //pivot 1 going right
                await animateTo(pivot1GroupRef.current, { x: centerX }, duration, { originY: 100 });

                await animatePartition(partionProps);

                await Promise.all(
                    leftXpos.map((pos, i) => animateTo(leftArrayRef.current[i], { y: 120 }, duration, { originY: 55 }))
                )


                await Promise.all(
                    rightXpos.map((pos, i) => animateTo(rightArrayRef.current[i], { y: 120 }, duration, { originY: 55 }))

                );


                let leftPivot = await animateScale(leftArrayUpdated, setLeftArrayUpdated, setLeftArrayPivot);

                const partionLeftH1: partionProps = {
                    array: leftArrayNoPivot,
                    pivot: leftPivot,
                    refs: leftArrayRef.current,
                    centerX,
                    duration
                }

                //await animatePartition(partionLeftH1);




                props.setIsAnimating?.("done");
            })();


        }
    }, [props.isAnimating]);



    useEffect(() => {

        if (props.isAnimating === "done") {


            compareRefArray.current.map((node, i) => {
                if (node) {
                    const pos = node.position();
                    console.log(`After animation rect[${i}] position: `, pos);
                }
            })
        }
    }, [props.isAnimating])




    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            {/*Main array to be sorted */}
            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />
            {/*Selected Pivot*/}
            <RectangleGroup rectInfo={singlePivot} groupRef={pivot1GroupRef} offsetX={-20} />


            {
                arrayNoPivot.map((rect, i) => <RectangleGroup rectInfo={rect} groupRef={(el) => { compareRefArray.current[i] = el }} key={i}
                    offsetX={-20} />)
            }


            {
                leftArrayUpdated.map((rect, i) => <RectangleGroup rectInfo={rect} key={i} offsetX={0} offsetY={0}
                    groupRef={(el) => {
                        leftArrayRef.current[i] = el
                        if (el) rect.node = el
                    }}
                />)
            }

            {
                rightArrayUpdated.map((rect, i) => <RectangleGroup rectInfo={rect} groupRef={(el) => { rightArrayRef.current[i] = el }}
                    key={i} offsetX={0} offsetY={0} />)
            }



        </Layer>
    </Stage >)

}


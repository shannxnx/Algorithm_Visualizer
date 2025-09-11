import React, { useEffect, useRef, useState } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage, Rect, Group } from "react-konva";
import {
    RectangleRenderer,
    RectangleRendererScale,
    SortRectangleRenderer,
    SingleRectangleRenderer,
    RectangleGroup
} from "../../../RENDERER/Renderer";
import Konva from "konva";
import { animateTo, animateScale, animationScaleSmooth, animatePartition, type partionProps } from "../HELPER_FUNCTION/animation.helper";





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

}

export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    const mainArrayRef = useRef<Konva.Group>(null);
    const pivot1GroupRef = useRef<Konva.Group>(null);

    const [singlePivot, setSinglePivot] = useState<rectInfo>(exRect);
    const [compare1Rect, setCompare1Rect] = useState<rectInfo>(exRect);
    const [compare2Rect, setCompare2Rect] = useState<rectInfo>(exRect);


    const compare1Ref = useRef<Konva.Group>(null);
    const compare2Ref = useRef<Konva.Group>(null);
    const compareRefArray = useRef<(Konva.Group | null)[]>([]);



    const [arrayNoPivot, setArrayNoPivot] = useState<rectInfo[]>(props.boxesInfo.slice(0, props.boxesInfo.length - 1));
    console.log("Initial array no pivot: ", arrayNoPivot);

    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));

    useEffect(() => {

        const noPivot = props.boxesInfo.slice(0, props.boxesInfo.length - 1);

        setArrayNoPivot(noPivot);
        setCompare1Rect(noPivot[0]);
        setCompare2Rect(noPivot[1]);


    }, [props.boxesInfo]);



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

                }
                //pivot 1 going down
                await animateTo(pivot1GroupRef.current, { y: 55 }, duration, { originX: 0, originY: 0 });
                //pivot 1 going right
                await animateTo(pivot1GroupRef.current, { x: centerX - 20 }, duration, { originY: 100 });

                await animatePartition(partionProps);


                props.setIsAnimating?.("done");
            })();



        }
    }, [props.isAnimating]);



    //console.log("Single Pivot: ", singlePivot);
    //console.log("Compare1 : ", compare1Rect);
    //console.log("Compare2 : ", compare2Rect);
    //console.log("Array no Pivot: ", arrayNoPivot);



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



            {/*
                <RectangleGroup rectInfo={compare1Rect} groupRef={compare1Ref} offsetX={-20} />
                <RectangleGroup rectInfo={compare2Rect} groupRef={compare2Ref} offsetX={-20} />
            */}


        </Layer>
    </Stage >)

}


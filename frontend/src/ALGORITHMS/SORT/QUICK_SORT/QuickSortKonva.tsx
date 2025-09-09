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
import { animateTo, animateScale } from "../HELPER_FUNCTION/animation.helper";





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
    const centerRectRef = useRef<Konva.Group>(null);
    const [pivot1, setPivot1] = useState<rectInfo[]>([]);

    const [singlePivot, setSinglePivot] = useState<rectInfo>(exRect);


    const halfLen = Math.floor(props.boxesInfo.length / 2);

    const manualX = 50 * halfLen; //only works if odd
    const manualX2 = 50 * halfLen;

    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));


    useEffect(() => {
        if (props.isAnimating === "animating") {
            const duration: number = 1350;

            (async () => {



                //finding pivot on the first array or the  main array
                await animateScale(props.boxesInfo, props.setBoxesInfo, setSinglePivot);



                //pivot 1 going down
                await animateTo(pivot1GroupRef.current, { y: 55 }, duration, { originX: 0, originY: 0 });

                //pivot 1 going right
                await animateTo(pivot1GroupRef.current, { x: centerX - 20 }, duration, { originY: 100 });


                //await animateTo(pivot1GroupRef.current, { x: centerX - 20 }, duration, { originX: 100, originY: 100 });





                props.setIsAnimating?.("done");
            })();
        }
    }, [props.isAnimating]);



    console.log("Single Pivot: ", singlePivot);
    console.log("Array Pivot: ", pivot1);
    console.log("Center rect: ", centerRectRef.current?.x());

    const singleRectRef = useRef<Konva.Group>(null);



    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />

            {/*<SingleRectangleRenderer array={pivot1} offsetX={0} offsetY={0} groupRef={pivot1GroupRef} />*/}
            {/*<Group x={centerX - 20} y={105} ref={centerRectRef}>
                <Rect width={props.boxesInfo[0].width} height={props.boxesInfo[0].height}
                    x={centerX - 20} y={55} cornerRadius={5} fill={"red"} />
            </Group>*/}


            <RectangleGroup rectInfo={singlePivot} groupRef={pivot1GroupRef} offsetX={-20} />













        </Layer>
    </Stage >)

}


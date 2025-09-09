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
import { animateTo, animateScale, animationScaleSmooth } from "../HELPER_FUNCTION/animation.helper";





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


    const [arrayNoPivot, setArrayNoPivot] = useState<rectInfo[]>(props.boxesInfo.slice(0, props.boxesInfo.length - 1));


    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));

    useEffect(() => {
        setArrayNoPivot(props.boxesInfo.slice(0, props.boxesInfo.length - 1));

        setCompare1Rect(arrayNoPivot[0]);
        setCompare2Rect(arrayNoPivot[1]);

    }, [props.boxesInfo])

    useEffect(() => {
        if (props.isAnimating === "animating") {
            const duration: number = 1350;

            (async () => {



                //finding pivot on the first array or the  main array
                await animateScale(props.boxesInfo, props.setBoxesInfo, setSinglePivot);

                //pivot 1 going down
                await animateTo(pivot1GroupRef.current, { y: 110 }, duration, { originX: 0, originY: 0 });

                //pivot 1 going right
                await animateTo(pivot1GroupRef.current, { x: centerX - 20 }, duration, { originY: 100 });


                await animationScaleSmooth(props.boxesInfo[0].node!, 1.1, 0.7);
                await animationScaleSmooth(props.boxesInfo[0].node!, 1, 0.7);


                if (compare1Rect.number > singlePivot.number) {
                    await animateTo(compare1Ref.current, { y: 55 }, duration, { originX: 0, originY: 10 });
                    await animateTo(compare1Ref.current, { x: centerX + 100 }, duration, { originX: 0, originY: 0 });
                }







                props.setIsAnimating?.("done");
            })();
        }
    }, [props.isAnimating]);



    console.log("Single Pivot: ", singlePivot);
    console.log("Compare1 : ", compare1Rect);
    console.log("Compare2 : ", compare2Rect);
    //console.log("Array no Pivot: ", arrayNoPivot);



    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            {/*Main array to be sorted */}
            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />

            <RectangleGroup rectInfo={singlePivot} groupRef={pivot1GroupRef} offsetX={-20} />
            <RectangleGroup rectInfo={compare1Rect} groupRef={compare1Ref} offsetX={-20} />

            <RectangleGroup rectInfo={compare2Rect} groupRef={compare2Ref} offsetX={-20} />



        </Layer>
    </Stage >)

}


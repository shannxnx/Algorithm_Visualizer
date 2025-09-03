import React, { useEffect, useRef } from "react";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage, Rect } from "react-konva";
import { RectangleRenderer } from "../../../RENDERER/Renderer";
import Konva from "konva";


type animation = "idle" | "animating" | "done";

type QuickPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    animationControllerRef?: React.RefObject<{ shouldStop: boolean }>;
    konvaWidth?: number,
    konvaHeight?: number
};

interface QuickSortProps {
    props: QuickPayload
}


export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    console.log("Boxes info: ", props.boxesInfo);


    const mainArrayRef = useRef<Konva.Group>(null);

    //useEffect(() => {
    //    if (props.isAnimating === "animating") {
    //        if (props.konvaWidth! >= 650) {
    //            (async () => {
    //                mainArrayRef.current?.x(0);
    //            })();
    //        }
    //    }
    //}, [props.isAnimating])


    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            <RectangleRenderer array={props.boxesInfo} offsetX={-20} offsetY={50} />


        </Layer>
    </Stage>)

}
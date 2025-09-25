import React, { useEffect, useRef, useState } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import { RectangleRendererScale } from "../../../RENDERER/Renderer";
import { animateTo, InsertionSortAnimation } from "../HELPER_FUNCTION/animation.helper";

type InsertionSortPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
}

interface InsertionSortProps {
    props: InsertionSortPayload
}



const InsertionSortKonva: React.FC<InsertionSortProps> = ({ props }) => {

    console.log("Array info: ", props.boxesInfo);

    const middleY = props.konvaHeight! / 2;

    const [array, setArray] = useState([...props.boxesInfo]);


    useEffect(() => {
        if (props.isAnimating === "animating") {

            (async () => {

                await InsertionSortAnimation(props.boxesInfo);



            })()
            props.setIsAnimating!("done");
        }
    }, [props.isAnimating]);


    return <Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">
        <Layer>
            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={middleY} />
        </Layer>
    </Stage>
}

export default InsertionSortKonva;
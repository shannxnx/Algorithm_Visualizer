import React, { useEffect, useState } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage } from "react-konva";
import { RectangleIndex, RectangleRendererIS } from "../../../RENDERER/Renderer";
import { InsertionSortAnimation } from "../HELPER_FUNCTION/animation.helper";

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



    const middleY = props.konvaHeight! / 2;

    const [array, setArray] = useState([...props.boxesInfo]);


    useEffect(() => {
        setArray(props.boxesInfo);
    }, [props.boxesInfo])


    useEffect(() => {
        if (props.isAnimating === "animating") {

            (async () => {

                await InsertionSortAnimation(array, 500, props.setBoxesInfo);

            })()
            props.setIsAnimating!("done");
        }
    }, [props.isAnimating]);




    return <Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">
        <Layer>
            <RectangleRendererIS array={array} offsetX={-20} offsetY={middleY} />
            <RectangleIndex array={array} offsetX={-20} offsetY={middleY} />
        </Layer>
    </Stage>
}

export default InsertionSortKonva;
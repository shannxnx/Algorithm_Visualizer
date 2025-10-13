import React, { useEffect, useState } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage } from "react-konva";
import { RectangleIndex, RectangleRendererIS } from "../../../RENDERER/Renderer";
import { ExponentialSearchAnimation, InterpolationAnimation, JumpSearchAnimation } from "../searchAnimation.helper";


type ExponentialSearchPayload = {

    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
    searchValue?: number
}

interface ExponentialSearchProps {
    props: ExponentialSearchPayload
}

export interface indexInterface {
    scaleX: number,
    scaleY: number,
    width: number,
    height: number,
    x: number,
    y: number,
    index: number
}


const ExponentialSearchKonva: React.FC<ExponentialSearchProps> = ({ props }) => {

    const middleY = props.konvaHeight! / 2;
    const [array, setArray] = useState([...props.boxesInfo]);
    const [indexNum, setIndexNum] = useState<indexInterface[]>([]);


    useEffect(() => {
        setArray(props.boxesInfo);
        setIndexNum(props.boxesInfo.map((r, i) => {
            const retThis: indexInterface = {
                scaleX: r.scaleX!,
                scaleY: r.scaleY!,
                width: r.width,
                height: r.height,
                x: r.x,
                y: r.y,
                index: i
            };

            return retThis
        }));
    }, [props.boxesInfo]);



    useEffect(() => {

        if (props.isAnimating === "animating") {
            (async () => {
                //await JumpSearchAnimation(props.boxesInfo, props.searchValue!, props.setBoxesInfo);
                await ExponentialSearchAnimation(props.boxesInfo, props.searchValue!, props.setBoxesInfo);
            })()
        }

    }, [props.isAnimating]);





    return <Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">
        <Layer>
            <RectangleRendererIS array={array} offsetX={0} offsetY={middleY} />
            <RectangleIndex index={indexNum} offsetX={0} offsetY={middleY} />
        </Layer>
    </Stage>
}

export default ExponentialSearchKonva;




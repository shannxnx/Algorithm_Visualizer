import { Group, Layer, Stage } from "react-konva";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { RectangleIndex, RectangleRenderer, RectangleRendererIS, RectangleRendererScale, RectangleRendererSelection } from "../../../RENDERER/Renderer";
import { useEffect, useRef, useState } from "react";
import { SelectionSortAnimation } from "../HELPER_FUNCTION/animation.helper";
import type { indexInterface } from "../INSERTION_SORT/InsertionSortKonva";
import React from "react";
import Konva from "konva";

type SelectionSortPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
}

interface SelectionSortProps {
    props: SelectionSortPayload
};




const SelectionSortKonva: React.FC<SelectionSortProps> = ({ props }) => {

    const [array, setArray] = useState([...props.boxesInfo]);

    const nodeMapRef = useRef<Map<number, Konva.Group>>(new Map());
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


                await SelectionSortAnimation(props.boxesInfo, 500, nodeMapRef.current);



                props.setIsAnimating!("done");
            })()

        }
    }, [props.isAnimating])

    let x = 0;
    ++x;
    console.log("++x: ", x);
    //console.log("x++: ", x++);



    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">

        <Layer>

            <RectangleRendererSelection array={props.boxesInfo} offsetX={-20} offsetY={props.konvaHeight! / 2} nodeMapRef={nodeMapRef} />
            <RectangleIndex index={indexNum} offsetX={-20} offsetY={props.konvaHeight! / 2} />

        </Layer>

    </Stage >)
};


export default React.memo(SelectionSortKonva);
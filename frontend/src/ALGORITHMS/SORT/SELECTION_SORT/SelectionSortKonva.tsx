import { Group, Layer, Stage } from "react-konva";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { RectangleIndex, RectangleRenderer, RectangleRendererScale } from "../../../RENDERER/Renderer";
import { useEffect, useState } from "react";
import { SelectionSortAnimation } from "../HELPER_FUNCTION/animation.helper";
import type { indexInterface } from "../INSERTION_SORT/InsertionSortKonva";


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
}



const SelectionSortKonva: React.FC<SelectionSortProps> = ({ props }) => {

    const [array, setArray] = useState([...props.boxesInfo]);
    const [indexNum, setIndexNum] = useState<indexInterface[]>();


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
                await SelectionSortAnimation(array);
                props.setIsAnimating!("done");
            })()

        }
    }, [props.isAnimating])

    console.log("Selection Array: ", array);


    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">

        <Layer>

            <RectangleRendererScale array={array} offsetX={-20} offsetY={props.konvaHeight! / 2} />
            <RectangleIndex index={indexNum} offsetX={0} offsetY={props.konvaHeight! / 2} />

        </Layer>

    </Stage >)
};


export default SelectionSortKonva;
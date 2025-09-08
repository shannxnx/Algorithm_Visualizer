import React, { useEffect, useRef, useState } from "react";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage, Rect, Group } from "react-konva";
import {
    RectangleRenderer,
    RectangleRendererScale,
    SortRectangleRenderer,
    SingleRectangleRenderer
} from "../../../RENDERER/Renderer";

import Konva from "konva";



type animation = "idle" | "animating" | "done";
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
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface destination {
    x: number,
    y: number
}
interface origin {
    originX: number,
    originY: number
}


function animateTo(
    node: Konva.Node | null,
    { x, y }: destination,
    duration: number,
    { originX, originY }: origin
): Promise<void> {


    return new Promise((resolve) => {
        const startX = originX || node!.x();
        const startY = originY || node!.y();



        const anim = new Konva.Animation((frame) => {
            if (!frame) return;
            const progress = Math.min(frame.time / duration, 1);

            if (x !== undefined) {
                const newX = startX + (x - startX) * progress;

                node!.x(newX);
            }
            if (y !== undefined) {
                const newY = startY + (y - startY) * progress;
                node!.y(newY);
            }

            if (progress >= 1) {
                anim.stop();
                resolve();
            }
        }, node!.getLayer());

        anim.start();
    });
};


function animationScaleSmooth(node: Konva.Node, scaleUp: number = 1.05, duration: number = 0.3): Promise<void> {
    return new Promise((resolve) => {
        const tween = new Konva.Tween({
            node,
            scaleX: scaleUp,
            scaleY: scaleUp,
            duration,
            easing: Konva.Easings.EaseInOut,
            onFinish: resolve
        });
        tween.play();

    })
}




async function animateScale(array: rectInfo[], action: (arr: rectInfo[]) => void, setPivot: (rect: rectInfo[]) => void) {
    let arrayCopy = [...array];


    for (let i = 0; i < arrayCopy.length; i++) {
        const node = arrayCopy[i].node;

        if (node) {
            await animationScaleSmooth(node, 1.1, 0.5); // scaling up
            await animationScaleSmooth(node, 1, 0.5);   // scaling down
        }

        if (i === arrayCopy.length - 1) {
            arrayCopy[i] = { ...arrayCopy[i], color: "red" };
            setPivot([arrayCopy[i]]);
            action([...arrayCopy]);
        }

    }

}





export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    const mainArrayRef = useRef<Konva.Group>(null);
    const pivot1GroupRef = useRef<Konva.Group>(null);
    const centerRectRef = useRef<Konva.Group>(null);
    const [pivot1, setPivot1] = useState<rectInfo[]>([]);


    //console.log("Pivot 1: ", pivot1);


    const halfLen = Math.floor(props.boxesInfo.length / 2);

    const manualX = 50 * halfLen; //only works if odd
    const manualX2 = 50 * halfLen;

    const centerX = Math.floor((props.konvaWidth! / 2) - (props.boxesInfo[0].width / 2));

    //console.log("centerX : ", centerX);
    console.log("Half length: ", halfLen);

    useEffect(() => {
        if (props.isAnimating === "animating") {
            const duration: number = 1350;

            (async () => {



                //finding pivot on the first array or the  main array
                await animateScale(props.boxesInfo, props.setBoxesInfo, setPivot1);

                //pivot 1 going down
                await animateTo(pivot1GroupRef.current, { x: -20, y: 100 }, duration, { originX: -20, originY: 50 });

                //pivot 1 going right
                await animateTo(pivot1GroupRef.current, { x: -120, y: 100 }, duration, { originX: 0, originY: 100 })





                props.setIsAnimating?.("done");
            })();
        }
    }, [props.isAnimating]);



    console.log("Pivot1X : ", pivot1GroupRef.current?.x());
    console.log("Center rect: ", centerRectRef.current?.x());

    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={50} />
            <SingleRectangleRenderer array={pivot1} offsetX={0} offsetY={0} groupRef={pivot1GroupRef} />

            <Group x={centerX - 20} y={105} ref={centerRectRef}>
                <Rect width={props.boxesInfo[0].width} height={props.boxesInfo[0].height}
                    fill={"red"} />

            </Group>


            {/*<Rect width={props.boxesInfo[0].width} height={props.boxesInfo[0].height} 
            x={centerX - 20} y={55} cornerRadius={5} fill={"red"} />*/}





        </Layer>
    </Stage >)

}


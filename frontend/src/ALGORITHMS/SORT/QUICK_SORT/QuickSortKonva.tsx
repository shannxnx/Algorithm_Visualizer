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
    konvaHeight?: number,
    setBoxesInfo: (array: rectInfo[]) => void;
};

interface QuickSortProps {
    props: QuickPayload
}


function animateTo(node: Konva.Node | null,
    { x, y }: { x?: number; y?: number }, duration: number,
    { originX, originY }: { originX?: number, originY?: number }): Promise<void> {


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

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateScale(array: rectInfo[], action: (arr: rectInfo[]) => void) {
    let arrayCopy = [...array];
    let delayCount = 600;
    for (let i = 0; i < array.length; i++) {
        arrayCopy[i] = { ...arrayCopy[i], scaleX: 1.05, scaleY: 1.05 };
        action([...arrayCopy]);
        await delay(delayCount);

        arrayCopy[i] = { ...arrayCopy[i], scaleX: 1, scaleY: 1 };
        if (i === array.length - 1) arrayCopy[i] = { ...arrayCopy[i], color: "red" };
        action([...arrayCopy])
        await delay(delayCount);

    }
}





export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {



    const mainArrayRef = useRef<Konva.Group>(null);




    useEffect(() => {
        if (props.isAnimating === "animating") {
            (async () => {
                animateScale(props.boxesInfo, props.setBoxesInfo);

                props.setIsAnimating?.("done");
            })();
        }
    }, [props.isAnimating]);




    return (<Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%] ">
        <Layer>

            <RectangleRenderer array={props.boxesInfo} offsetX={-20} offsetY={50} />


        </Layer>
    </Stage>)

}
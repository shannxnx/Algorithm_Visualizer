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




async function animateScale(array: rectInfo[], action: (arr: rectInfo[]) => void) {
    let arrayCopy = [...array];


    for (let i = 0; i < arrayCopy.length; i++) {
        const node = arrayCopy[i].node;

        if (node) {
            await animationScaleSmooth(node, 1.1, 0.5); // scaling up
            await animationScaleSmooth(node, 1, 0.5);   // scaling down
        }

        if (i === arrayCopy.length - 1) {
            arrayCopy[i] = { ...arrayCopy[i], color: "red" };
            action([...arrayCopy]);
        }

    }

}





export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    const mainArrayRef = useRef<Konva.Group>(null);


    useEffect(() => {
        if (props.isAnimating === "animating") {
            (async () => {
                await animateScale(props.boxesInfo, props.setBoxesInfo);

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
import React, { useEffect, useRef } from "react";
import type { rectInfo, animation } from "../../../INTERFACES && TYPES/sortInterface"
import { Layer, Stage } from "react-konva";
import Konva from "konva";
import { RectangleRendererScale } from "../../../RENDERER/Renderer";
import { animateTo } from "../HELPER_FUNCTION/animation.helper";


type QuickPayload = {
    boxesInfo: Array<rectInfo>;
    isAnimating?: animation;
    setIsAnimating?: (animate: animation) => void;
    konvaWidth?: number;
    konvaHeight?: number;
    setBoxesInfo: React.Dispatch<React.SetStateAction<rectInfo[]>>;
};

interface QuickSortProps {
    props: QuickPayload;
}


type QuickSortOp =
    | { type: "compare"; i: number; j: number }
    | { type: "swap"; i: number; j: number }
    | { type: "pivot"; index: number; finalIndex: number };


function getQuickSortOps(arr: number[]): QuickSortOp[] {
    const ops: QuickSortOp[] = [];

    function partition(low: number, high: number): number {
        const pivot = arr[high];
        let i = low;

        for (let j = low; j < high; j++) {
            ops.push({ type: "compare", i: j, j: high });
            if (arr[j] < pivot) {
                ops.push({ type: "swap", i, j });
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }

        ops.push({ type: "swap", i, j: high });
        [arr[i], arr[high]] = [arr[high], arr[i]];
        ops.push({ type: "pivot", index: high, finalIndex: i });
        return i;
    }

    function quickSort(low: number, high: number) {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, arr.length - 1);
    return ops;
}


async function animateQuickSortOps(
    ops: QuickSortOp[],
    rects: rectInfo[],
    setRects: React.Dispatch<React.SetStateAction<rectInfo[]>>
) {
    for (const op of ops) {
        if (op.type === "compare") {
            setRects(prev =>
                prev.map((r, idx) =>
                    idx === op.i || idx === op.j ? { ...r, color: "red" } : { ...r, color: "blue" }
                )
            );
            await new Promise(res => setTimeout(res, 300));
        }

        if (op.type === "swap") {
            setRects(prev => {
                const newRects = [...prev];
                const temp = newRects[op.i];
                newRects[op.i] = { ...newRects[op.j], x: temp.x };
                newRects[op.j] = { ...temp, x: newRects[op.j].x };
                return newRects;
            });
            await new Promise(res => setTimeout(res, 600));
        }

        if (op.type === "pivot") {
            setRects(prev =>
                prev.map((r, idx) =>
                    idx === op.finalIndex ? { ...r, color: "green" } : r
                )
            );
            await new Promise(res => setTimeout(res, 800));
        }
    }
}


async function BackToBlue(setRects: React.Dispatch<React.SetStateAction<rectInfo[]>>) {
    setRects(prev => prev.map((r) => ({ ...r, color: "Blue" })));
    await new Promise(res => setTimeout(res, 600));
}

export const QuickSortKonva: React.FC<QuickSortProps> = ({ props }) => {
    useEffect(() => {
        if (props.isAnimating === "animating") {
            const values = props.boxesInfo.map(r => r.number);
            const ops = getQuickSortOps([...values]);

            console.log("Operation: ", ops);

            (async () => {
                await animateQuickSortOps(ops, props.boxesInfo, props.setBoxesInfo);
                props.setIsAnimating?.("done");
                await BackToBlue(props.setBoxesInfo);


            })();
        }
    }, [props.isAnimating]);



    return (
        <Stage width={props.konvaWidth} height={props.konvaHeight} className="w-full h-[95%]">
            <Layer>
                <RectangleRendererScale array={props.boxesInfo} offsetX={-20} offsetY={props.konvaHeight! / 2} />
            </Layer>
        </Stage>
    );
};

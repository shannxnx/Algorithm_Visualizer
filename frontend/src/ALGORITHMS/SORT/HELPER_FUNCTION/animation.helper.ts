import Konva from "konva";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface";





interface destination {
    x?: number,
    y?: number
}
interface origin {
    originX?: number,
    originY?: number
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function animateTo(
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


export function animationScaleSmooth(node: Konva.Node, scaleUp: number = 1.05, duration: number = 0.3): Promise<void> {
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


export async function animateSort(array: rectInfo[], duration: number = 500) {
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].number! > arr[j + 1].number!) {
                const nodeA = arr[j].node;
                const nodeB = arr[j + 1].node;


                if (!nodeA || !nodeB) continue;

                const xA = nodeA.x();
                const xB = nodeB.x();


                await Promise.all([
                    animateTo(nodeA, { x: xB }, duration, { originX: xA }),
                    animateTo(nodeB, { x: xA }, duration, { originX: xB }),
                ]);


                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}


export async function animateScale(array: rectInfo[], action: (arr: rectInfo[]) => void, setPivot: (rect: rectInfo[]) => void) {
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

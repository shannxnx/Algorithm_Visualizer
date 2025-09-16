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




export async function animateScale(array: rectInfo[], action: (arr: rectInfo[]) => void, setPivot: (rect: rectInfo) => void): Promise<rectInfo> {
    let arrayCopy = [...array];
    let pivot: rectInfo | null = null;

    for (let i = 0; i < arrayCopy.length; i++) {
        const node = arrayCopy[i].node;

        if (node) {
            await animationScaleSmooth(node, 1.1, 0.5); // scaling up
            await animationScaleSmooth(node, 1, 0.5);   // scaling down
        }

        if (i === arrayCopy.length - 1) {
            arrayCopy[i] = { ...arrayCopy[i], color: "red" };
            pivot = arrayCopy[i];
            setPivot(arrayCopy[i]);
            action([...arrayCopy]);
        }

    }

    return pivot!;

};



export interface partionProps {
    array: rectInfo[],
    pivot: rectInfo,
    refs: (Konva.Group | null)[],
    duration: number,
    destinationY: number,
    destinationX: number,
    spacingLeft: number,
    spacingRight: number,
    originY?: number,
    originX?: number,
    pivotDestinationX?: number,
    pivotDestinationY?: number,
    fromWhere?: string,
    spacing?: number,
};










export async function animatePartition({ ...props }: partionProps) {

    let left: number = 0;
    let right: number = 0;
    const rectWidth = props.array[0].width;
    const spacing = rectWidth === 40 ? 46 : 40;
    //console.log("Spacing: ", spacing);



    //console.log("Array length to be partioned: ", props.array.length);
    console.log("Array to be partioned: ", props.array);
    for (let i = 0; i < props.array.length; i++) {
        const rect = props.array[i];
        const ref = props.refs[i];
        if (!ref) continue;

        await animationScaleSmooth(rect.node!, 1.1, 0.7);
        await animationScaleSmooth(rect.node!, 1, 0.7);


        if (rect.number > props.pivot.number) {
            right++;
        } else {
            left++;
        }




        const xOffset = rect.number > props.pivot.number
            ? props.spacingRight - (right * spacing)
            : -props.spacingLeft + (left * spacing);

        const finalDestinationX = Math.round(props.destinationX + xOffset);

        await animateTo(ref, { y: props.destinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 }); //original destination : 55
        await animateTo(ref, { x: finalDestinationX }, props.duration, { originX: 0, originY: 0 });

    }
}

export async function animatePartition2({ ...props }: partionProps) {

    let left: number = 0;
    let right: number = 0;
    const rectWidth = props.array[0].width;
    const spacing = rectWidth === 40 ? 46 : 40;
    //console.log("Spacing: ", spacing);


    switch (props.fromWhere) {
        case "Left":
            for (let i = 0; i < props.array.length; i++) {
                const rect = props.array[i];
                const ref = props.refs[i];
                if (!ref) continue;

                await animationScaleSmooth(rect.node!, 1.1, 0.7);
                await animationScaleSmooth(rect.node!, 1, 0.7);

                if (rect === props.pivot) {
                    await animateTo(ref, { y: props.pivotDestinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
                    await animateTo(ref, { x: props.pivotDestinationX }, props.duration, { originX: 0, originY: 0 });
                    continue;
                }

                const xOffset = rect.number > props.pivot.number
                    ? props.spacingRight - (right * spacing)
                    : -props.spacingLeft + (left * spacing);

                const finalDestinationX = Math.round(props.destinationX + xOffset);

                await animateTo(ref, { y: props.destinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
                await animateTo(ref, { x: finalDestinationX }, props.duration, { originX: 0, originY: 0 });

                if (rect.number > props.pivot.number) {
                    right++;
                } else {
                    left++;
                }
            }
            break;

        case "Right":
            for (let i = props.array.length - 1; i >= 0; i--) {
                const rect = props.array[i];
                const ref = props.refs[i];
                if (!ref) continue;

                await animationScaleSmooth(rect.node!, 1.1, 0.7);
                await animationScaleSmooth(rect.node!, 1, 0.7);

                if (rect === props.pivot) {
                    await animateTo(ref, { y: props.pivotDestinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
                    await animateTo(ref, { x: props.pivotDestinationX }, props.duration, { originX: 0, originY: 0 });
                    continue;
                }

                const xOffset = rect.number > props.pivot.number
                    ? props.spacingLeft - (right * spacing)
                    : -props.spacingRight + (left * spacing);

                const finalDestinationX = Math.round(props.destinationX + xOffset);

                await animateTo(ref, { y: props.destinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
                await animateTo(ref, { x: finalDestinationX }, props.duration, { originX: 0, originY: 0 });

                if (rect.number > props.pivot.number) {
                    right++;
                } else {
                    left++;
                }
            }
            break;
    }



    //switch (props.fromWhere) {
    //    case "Left":
    //        console.log("Array to be partioned: ", props.array);
    //        for (let i = 0; i < props.array.length; i++) {
    //            const rect = props.array[i];
    //            const ref = props.refs[i];
    //            if (!ref) continue;

    //            await animationScaleSmooth(rect.node!, 1.1, 0.7);
    //            await animationScaleSmooth(rect.node!, 1, 0.7);


    //            if (rect.number > props.pivot.number) {
    //                right++;
    //            } else {
    //                left++;
    //            }

    //            if (rect === props.pivot) {
    //                await animateTo(ref, { y: props.pivotDestinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
    //                await animateTo(ref, { x: props.pivotDestinationX }, props.duration, { originX: 0, originY: 0 });
    //                continue;
    //            }


    //            const xOffset = rect.number > props.pivot.number
    //                ? props.spacingRight - (right * spacing)
    //                : -props.spacingLeft + (left * spacing);

    //            const finalDestinationX = Math.round(props.destinationX + xOffset);

    //            await animateTo(ref, { y: props.destinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 }); //original destination : 55
    //            await animateTo(ref, { x: finalDestinationX }, props.duration, { originX: 0, originY: 0 });

    //        }
    //        break;

    //    case "Right":
    //        console.log("Array to be partioned: ", props.array);
    //        for (let i = props.array.length - 1; i >= 0; i--) {
    //            const rect = props.array[i];
    //            const ref = props.refs[i];
    //            if (!ref) continue;

    //            await animationScaleSmooth(rect.node!, 1.1, 0.7);
    //            await animationScaleSmooth(rect.node!, 1, 0.7);


    //            if (rect.number > props.pivot.number) {
    //                right++;
    //            } else {
    //                left++;
    //            }

    //            if (rect === props.pivot) {
    //                await animateTo(ref, { y: props.pivotDestinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 });
    //                await animateTo(ref, { x: props.pivotDestinationX }, props.duration, { originX: 0, originY: 0 });
    //                continue;
    //            }


    //            const xOffset = rect.number > props.pivot.number
    //                ? props.spacingRight - (right * spacing)
    //                : -props.spacingLeft + (left * spacing);

    //            const finalDestinationX = Math.round(props.destinationX + xOffset);

    //            await animateTo(ref, { y: props.destinationY }, props.duration, { originX: -5, originY: props.originY ? props.originY : 50 }); //original destination : 55
    //            await animateTo(ref, { x: finalDestinationX }, props.duration, { originX: 0, originY: 0 });

    //        }

    //        break;

    //}



}


// Assumes partionProps includes at least:
// array, pivot, refs, duration, destinationX, destinationY, pivotDestinationX?, pivotDestinationY?, spacing?,
// originY? (optional)

export async function animatePartition3({ ...props }: partionProps) {
    let left = 0;
    let right = 0;
    const rectWidth = props.array[0].width;
    const spacing = rectWidth === 40 ? 46 : 40;

    switch (props.fromWhere) {
        case "Left":
            let pivotOccurence1: boolean = false;
            console.log("Props rightArray: ", props.array);
            for (let i = props.array.length - 1; i >= 0; i--) {
                const rect = props.array[i];
                const ref = props.refs[i];
                if (!ref) continue;


                await animationScaleSmooth(rect.node!, 1.1, 0.7);
                await animationScaleSmooth(rect.node!, 1, 0.7);



                if (rect.number === props.pivot.number && pivotOccurence1 === false) {
                    await animateTo(ref, { y: props.pivotDestinationY }, props.duration, {
                        originX: -5,
                        originY: props.originY ?? 50,
                    });
                    await animateTo(ref, { x: props.pivotDestinationX }, props.duration, {
                        originX: 0,
                        originY: 0,
                    });
                    pivotOccurence1 = true;
                    continue;
                }


                let xOffset: number = 0;
                if (rect.number > props.pivot.number) {
                    right++;
                    xOffset = (props.pivotDestinationX! + (right * spacing)) + props.spacingRight;

                }

                else if (rect.number <= props.pivot.number) {
                    left++;
                    xOffset = (props.pivotDestinationX! - (left * spacing)) - props.spacingLeft;

                }

                const finalDestinationX = Math.round(xOffset);


                await animateTo(ref, { y: props.destinationY }, props.duration, {
                    originX: -5,
                    originY: props.originY ?? 50,
                });
                await animateTo(ref, { x: finalDestinationX }, props.duration, {
                    originX: 0,
                    originY: 0,
                });
            }
            break;

        case "Right":
            let pivotOccurence2: boolean = false;
            console.log("Props LeftArray: ", props.array);
            for (let i = props.array.length - 1; i >= 0; i--) {
                const rect = props.array[i];
                const ref = props.refs[i];
                if (!ref) continue;

                await animationScaleSmooth(rect.node!, 1.1, 0.7);
                await animationScaleSmooth(rect.node!, 1, 0.7);


                //console.log("Left Pivot: ", props.pivot);
                if (rect.number === props.pivot.number && pivotOccurence2 === false) {
                    console.log("PivotX :", props.pivotDestinationX);
                    await animateTo(ref, { y: props.pivotDestinationY }, props.duration, {
                        originX: -5,
                        originY: props.originY ?? 50,
                    });
                    await animateTo(ref, { x: props.pivotDestinationX }, props.duration, {

                        originY: 0,

                    });
                    pivotOccurence2 = true;
                    continue;
                }

                let xOffset: number = 0;
                if (rect.number > props.pivot.number) {
                    right++;
                    xOffset = (props.pivotDestinationX! + right * spacing) + props.spacingRight;


                } else if (rect.number <= props.pivot.number) {
                    left++;
                    xOffset = props.pivotDestinationX! - (left * spacing) - props.spacingLeft;

                }

                const finalDestinationX = Math.round(xOffset);


                await animateTo(ref, { y: props.destinationY }, props.duration, {
                    originX: -5,
                    originY: props.originY ?? 50,
                });
                await animateTo(ref, { x: finalDestinationX }, props.duration, {
                    originX: 0,
                    originY: 0,
                });
            }
            break;
    }
}

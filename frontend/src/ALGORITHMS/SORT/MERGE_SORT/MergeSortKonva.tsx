import { Stage, Layer, Rect, Text, Group } from "react-konva"
import type React from "react";
import { useEffect, useRef, useState, type AriaAttributes, type Ref, type RefObject } from "react";
import Konva from "konva";




const middle_x = window.innerWidth / 2;
const middle_y = window.innerHeight / 2;



type KonvaProps = {
    x: number,
    y: number,
    boxesInfo: Array<rectInfo>,
    rectCount: number,
    copyArray?: Array<rectInfo>
    isAnimating?: boolean,
    setIsAnimating: (bool: boolean) => void
}

interface rectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    number?: number,
    id: number,
    color?: string,
    node?: Konva.Node
};


const konvaWidth: number = 655;
const konvaHeight: number = 420;

type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number,
    offsetY: number,
    opacity?: number,


};

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];


function RectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {
    return (
        <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
            {
                array.map((r, id) => (
                    <Group
                        opacity={opacity}
                        key={`group-${id}`}
                        x={r.x}
                        y={r.y}
                    >
                        <Rect

                            width={r.width}
                            height={r.height}
                            fill={"blue"}


                        />
                        <Text

                            text={`${r.number}`}
                            width={r.width}
                            height={r.height}
                            align="center"
                            verticalAlign="middle"
                            fill="white"
                            fontSize={20}

                        />



                    </Group>


                ))
            }
        </Group>
    )
}


function SortRectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps
    & { groupRef: React.RefObject<Konva.Group | null> }
) {




    return <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY} opacity={opacity}>
        {
            array.map((r, id) => (
                <Group key={`group-${id}`} x={r.x} y={r.y} ref={(node) => { if (node) r.node = node }}>
                    <Rect width={r.width} height={r.height} fill={"blue"} />

                    <Text
                        text={`${r.number}`}
                        width={r.width}
                        height={r.height}
                        align="center"
                        verticalAlign="middle"
                        fill="white"
                        fontSize={20}

                    />



                </Group>
            ))
        }
    </Group>
}



function leftArray(array: Array<rectInfo>): Array<rectInfo> {
    if (array) {
        const arrayLength = array?.length;
        const leftLength = Math.floor(arrayLength / 2);
        const leftArray: Array<rectInfo> = [];

        for (let i = 0; i < leftLength; i++) {
            const rect: rectInfo = array[i];
            leftArray.push(rect);
        };


        return leftArray;

    }
    return [];
};


function rightArray(array: Array<rectInfo>): Array<rectInfo> {
    if (array) {
        const arrayLength = array?.length;
        const leftLength = Math.floor(arrayLength / 2);
        const rightLength = arrayLength - leftLength;

        const isOdd = array.length % 2 === 0 ? false : true

        const rightArray: Array<rectInfo> = [];



        switch (isOdd) {
            case true:
                for (let i = rightLength - 1; i < arrayLength; i++) {
                    const rect: rectInfo = array[i];

                    rightArray.push(rect);
                };
                break;
            case false:
                for (let i = rightLength; i < arrayLength; i++) {
                    const rect: rectInfo = array[i];

                    rightArray.push(rect);
                };
                break;
            default:
                break;
        }

        return rightArray;



        //setLeft(leftArray);
        //setRight(rightArray);

    }
    return [];
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

async function animateSort(array: rectInfo[], duration: number = 500) {
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


async function invisibleAnimation(array: rectInfo[], duration: number) {
    array.forEach(r => {
        if (r.node) {
            r.node.getParent()?.to({
                opacity: 0,
                duration: 1,
                onFinish: () => {
                    r.node?.getParent()?.visible(false);
                }
            })
        }
    })
};



function mergeArray(array1: rectInfo[], array2: rectInfo[]) {
    return [...array1, ...array2];
}






export const MergeSortKonva: React.FC<KonvaProps> = ({ x, y, boxesInfo, copyArray, isAnimating, rectCount, setIsAnimating
}) => {

    const [rectArray, setRectArray] = useState<Array<rectInfo>>([]);
    const [rectArraySpaces, setRectArraySpaces] = useState<Array<rectInfo>>([]);
    const [finalSortedArray, setFinalSortedArray] = useState<Array<rectInfo>>([]);

    const [opacity1, setOpacity1] = useState<number>(1);
    const [opacity2, setOpacity2] = useState<number>(0);
    const [opacity3, setOpacity3] = useState<number>(0);
    const [opacity4, setOpacity4] = useState<number>(0);

    const [left, setLeft] = useState<Array<rectInfo>>([]);
    const [right, setRight] = useState<Array<rectInfo>>([]);
    const [sortedLeft, setSortedLeft] = useState<Array<rectInfo>>([]);
    const [sortedRight, setSortedRight] = useState<Array<rectInfo>>([]);

    const [movingSortedL, setMovingSortedL] = useState<Array<rectInfo>>([]);
    const [movingSortedR, setMovingSortedR] = useState<Array<rectInfo>>([]);




    const [leftH1, setLeftH1] = useState<Array<rectInfo>>([]);
    const [leftH2, setLeftH2] = useState<Array<rectInfo>>([]);

    const [sortedLeftH1, setSortedLeftH1] = useState<Array<rectInfo>>([]);
    const [sortedLeftH2, setSortedLeftH2] = useState<Array<rectInfo>>([]);
    const [toBeSortedLeftH1, setToBeSortedLeftH1] = useState<Array<rectInfo>>([]);
    const [toBeSortedLeftH2, setToBeSortedLeftH2] = useState<Array<rectInfo>>([]);


    const [rightH1, setRightH1] = useState<Array<rectInfo>>([]);
    const [rightH2, setRightH2] = useState<Array<rectInfo>>([]);
    const [toBeSortedRightH1, setToBeSortedRightH1] = useState<Array<rectInfo>>([]);
    const [toBeSortedRightH2, setToBeSortedRightH2] = useState<Array<rectInfo>>([]);


    const [sortedRightH1, setSortedRightH1] = useState<Array<rectInfo>>([]);
    const [sortedRightH2, setSortedRightH2] = useState<Array<rectInfo>>([]);


    function visibleOpacity(func: (num: number) => void): Promise<void> {
        return new Promise((resolve) => {
            for (let i = 0; i <= 10; i++) {
                setTimeout(() => {
                    func(i / 10);
                    if (i === 10) resolve();
                }, i * 40);

            }
        })
    };

    async function invisibleOpacity(
        func: (num: number) => void,
        step = 30
    ): Promise<void> {
        return new Promise((resolve) => {
            for (let i = 0; i <= 10; i++) {
                setTimeout(() => {
                    func(1 - i / 10);
                    if (i === 10) resolve();
                }, i * step);
            }
        });
    }

    const stageHeight = y + 50 + 50;


    function generateArray(length: number) {
        const array: Array<rectInfo> = [];
        let copyArrays: Array<rectInfo> = [];


        const rectWidth = length > 6 ? 35 : 40;
        const spacing = 5;
        const totalWidth = length * rectWidth + (length - 1) * spacing

        const startX = (konvaWidth / 2) - (totalWidth / 2);

        for (let i = 0; i < length; i++) {

            const rectangle: rectInfo = {
                x: startX + i * (rectWidth + spacing),
                y: -45,
                width: rectWidth,
                height: rectWidth,
                id: i,
                number: Math.floor(Math.random() * 100),
                color: "Blue"
            }

            const copyRectangle: rectInfo = {
                x: startX + i * (rectWidth + spacing + 15),
                y: -45,
                width: rectWidth,
                height: rectWidth,
                id: i,
                number: rectangle.number
            }

            array.push(rectangle);
            copyArrays.push(copyRectangle);
        }


        const finalSortedNumber = [...boxesInfo].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedArray = [...boxesInfo].map((r, i) => ({ ...r, number: finalSortedNumber[i] }));

        setRectArray(boxesInfo);
        //setRectArraySpaces(copyArray!);

        setFinalSortedArray(finalSortedArray);

        const lArray = leftArray(boxesInfo);
        const rArray = rightArray(boxesInfo);

        const sortedLeftNumber = [...lArray].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedLeft = [...lArray].map((r, i) => ({
            ...r,
            number: sortedLeftNumber[i]

        }));

        const sortedRightNumber = [...rArray].map((r) => r.number).sort((a, b) => a! - b!);
        const finalSortedRight = [...rArray].map((r, i) => ({ ...r, number: sortedRightNumber[i] }))


        setLeft(lArray);
        setRight(rArray);





        const lArrayH1 = leftArray(lArray);
        const lArrayH2 = rightArray(lArray);

        const sortedNumberH1 = [...lArrayH1].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedH1 = [...lArrayH1].map((r, i) => ({ ...r, number: sortedNumberH1[i] }));
        setSortedLeftH1(finalSortedH1);


        const sortedNumberH2 = [...lArrayH2].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedH2 = [...lArrayH2].map((r, i) => ({ ...r, number: sortedNumberH2[i] }));
        setSortedLeftH2(finalSortedH2);


        const rArrayH1 = leftArray(rArray);
        const rArrayH2 = rightArray(rArray);


        const rightSortedNumberH1 = [...rArrayH1].map(r => r.number).sort((a, b) => a! - b!);
        const finalRightSortedH1 = [...rArrayH1].map((r, i) => ({ ...r, number: rightSortedNumberH1[i] }));
        setSortedRightH1(finalRightSortedH1);


        const rightSortedNumberH2 = [...rArrayH2].map(r => r.number).sort((a, b) => a! - b!);
        const finalRightSortedH2 = [...rArrayH2].map((r, i) => ({ ...r, number: rightSortedNumberH2[i] }));
        setSortedRightH2(finalRightSortedH2);


        setLeftH1(lArrayH1);
        setLeftH2(lArrayH2);
        setToBeSortedLeftH1(lArrayH1);
        setToBeSortedLeftH2(lArrayH2);


        setRightH1(rArrayH1);
        setRightH2(rArrayH2);
        setToBeSortedRightH1(rArrayH1);
        setToBeSortedRightH2(rArrayH2);

        setSortedLeft(mergeArray(finalSortedH1, finalSortedH2));
        setSortedRight(mergeArray(finalRightSortedH1, finalRightSortedH2));

        setMovingSortedL(finalSortedLeft);
        setMovingSortedR(finalSortedRight);

        setFinalSortedArray(mergeArray(finalSortedLeft, finalSortedRight));




    };

    function splitArray(array: Array<rectInfo>) {
        if (array) {
            const arrayLength = array?.length;
            const leftLength = Math.floor(arrayLength / 2);
            const rightLength = arrayLength - leftLength;

            const isOdd = array.length % 2 === 0 ? false : true


            const leftArray: Array<rectInfo> = [];
            const rightArray: Array<rectInfo> = [];

            for (let i = 0; i < leftLength; i++) {
                const rect: rectInfo = array[i];

                leftArray.push(rect);
            };

            switch (isOdd) {
                case true:
                    for (let i = rightLength - 1; i < arrayLength; i++) {
                        const rect: rectInfo = array[i];

                        rightArray.push(rect);
                    };
                    break;
                case false:
                    for (let i = rightLength; i < arrayLength; i++) {
                        const rect: rectInfo = array[i];

                        rightArray.push(rect);
                    };
                    break;
                default:
                    break;
            }



            setLeft(leftArray);
            setRight(rightArray);
        }
    }

    useEffect(() => {
        generateArray(6);
    }, []);


    const sortedLeftRef = useRef<Konva.Group>(null);
    const leftGroupRef = useRef<Konva.Group>(null);
    const leftH1Ref = useRef<Konva.Group>(null);
    const leftH2Ref = useRef<Konva.Group>(null);
    const toBeSortLH1Ref = useRef<Konva.Group>(null);
    const toBeSortLH2Ref = useRef<Konva.Group>(null);
    const sortedLeftH1Ref = useRef<Konva.Group>(null);
    const sortedLeftH2Ref = useRef<Konva.Group>(null);
    const movingSortedLRef = useRef<Konva.Group>(null);


    const sortedRightRef = useRef<Konva.Group>(null);
    const rightGroupRef = useRef<Konva.Group>(null);
    const rightH1Ref = useRef<Konva.Group>(null);
    const rightH2Ref = useRef<Konva.Group>(null);
    const toBeSortRH1Ref = useRef<Konva.Group>(null);
    const toBeSortRH2Ref = useRef<Konva.Group>(null);
    const sortedRightH1Ref = useRef<Konva.Group>(null);
    const sortedRightH2Ref = useRef<Konva.Group>(null);
    const movingSortedRRef = useRef<Konva.Group>(null)


    const finalSortedArrayRef = useRef<Konva.Group>(null);


    useEffect(() => {
        if (isAnimating && leftGroupRef.current && leftH1Ref.current && leftH2Ref.current) {
            const duration = 1350;

            (async () => {

                finalSortedArrayRef.current!.x(0);
                finalSortedArrayRef.current!.y(390);

                leftH1Ref.current!.x(-50);
                leftH2Ref.current!.x(-50);
                toBeSortLH1Ref.current!.x(-100);
                toBeSortLH2Ref.current!.x(-70);
                sortedLeftH1Ref.current!.x(-100);
                sortedLeftH2Ref.current!.x(-70);

                sortedLeftRef.current!.x(-50);
                sortedLeftRef.current!.y(320);

                sortedRightRef.current!.y(320);
                sortedRightRef.current!.x(50);

                movingSortedLRef.current!.x(-50);
                movingSortedLRef.current!.y(320);

                movingSortedRRef.current!.x(50);
                movingSortedRRef.current!.y(320);




                await animateTo(leftGroupRef.current, { y: 120 }, duration, { originX: 0, originY: 50 });
                await animateTo(leftGroupRef.current, { x: -50 }, duration, { originX: 0, originY: 50 });

                await Promise.all([
                    animateTo(leftH1Ref.current, { y: 190 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                    animateTo(leftH2Ref.current, { y: 190 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                ]);

                await Promise.all([
                    animateTo(leftH1Ref.current, { x: -100 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                    animateTo(leftH2Ref.current, { x: -70 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                ]);

                await Promise.all([
                    animateTo(toBeSortLH1Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 }),
                    animateTo(toBeSortLH2Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 })

                ]);

                await Promise.all([
                    animateTo(toBeSortLH1Ref.current, { x: -100 }, duration, { originX: 0, originY: 190 }),
                    animateTo(toBeSortLH2Ref.current, { x: -70 }, duration, { originX: 0, originY: 190 }),


                ]);

                //await animateSort(toBeSortedLeftH1, 800);
                //await animateSort(toBeSortedLeftH2, 800)

                await Promise.all([
                    animateSort(toBeSortedLeftH1, 800),
                    animateSort(toBeSortedLeftH2, 800),
                    animateSort(toBeSortedRightH1, 800),
                    animateSort(toBeSortedRightH2, 800)
                ]);

                await Promise.all([
                    animateTo(sortedLeftH1Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                    animateTo(sortedLeftH2Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                    animateTo(sortedRightH1Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),
                    animateTo(sortedRightH2Ref.current, { y: 320 }, duration, { originX: 0, originY: 260 }),

                ]);

                await Promise.all([
                    animateTo(sortedLeftH1Ref.current, { x: -50 }, duration, { originX: 0, originY: 190 }),
                    animateTo(sortedLeftH2Ref.current, { x: -50 }, duration, { originX: 0, originY: 190 }),
                    animateTo(sortedRightH1Ref.current, { x: 50 }, duration, { originX: 0, originY: 260 }),
                    animateTo(sortedRightH2Ref.current, { x: 50 }, duration, { originX: 0, originY: 260 }),
                ]);



                // await Promise.all([
                //     invisibleAnimation(sortedLeftH1, 500),
                //     invisibleAnimation(sortedLeftH2, 500),

                // ]);
                await invisibleOpacity(setOpacity1);
                await visibleOpacity(setOpacity2)

                await Promise.all([
                    animateSort(sortedLeft, 800),
                    animateSort(sortedRight, 800)
                ])


                await visibleOpacity(setOpacity3);

                //await animateTo(movingSortedLRef.current, { y: 390 }, duration, { originX: 0, originY: 320 });
                //await animateTo(movingSortedRRef.current, { y: 390 }, duration, { originX: 0, originY: 320 })

                await Promise.all([
                    animateTo(movingSortedLRef.current, { y: 390 }, duration, { originX: 0, originY: 320 }),
                    animateTo(movingSortedRRef.current, { y: 390 }, duration, { originX: 0, originY: 320 }),
                ]);

                await animateTo(movingSortedLRef.current, { x: 0 }, duration, { originX: 0, originY: 320 }),
                    await animateTo(movingSortedRRef.current, { x: 0 }, duration, { originX: 0, originY: 320 })


                await invisibleOpacity(setOpacity3);
                await visibleOpacity(setOpacity4);

                await animateSort(finalSortedArray, 800)
                setIsAnimating(false);








            })();
        }

        if (isAnimating && rightGroupRef.current && rightH1Ref.current && rightH2Ref.current) {
            const duration = 1350;

            (async () => {

                rightH1Ref.current!.x(50);
                rightH2Ref.current!.x(50);
                toBeSortRH1Ref.current!.x(80);
                toBeSortRH2Ref.current!.x(110);
                sortedRightH1Ref.current!.x(80);
                sortedRightH2Ref.current!.x(110);
                sortedRightRef.current!.x(50);
                //sortedRightRef.current!.y(320);

                await animateTo(rightGroupRef.current, { y: 120 }, duration, { originX: 0, originY: 50 });
                await animateTo(rightGroupRef.current, { x: 50 }, duration, { originX: 0, originY: 50 });


                await Promise.all([
                    animateTo(rightH1Ref.current, { y: 190 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                    animateTo(rightH2Ref.current, { y: 190 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                ]);

                await Promise.all([
                    animateTo(rightH1Ref.current, { x: 80 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                    animateTo(rightH2Ref.current, { x: 110 }, duration, {
                        originX: 0,
                        originY: 120,
                    }),
                ]);

                await Promise.all([
                    animateTo(toBeSortRH1Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 }),
                    animateTo(toBeSortRH2Ref.current, { y: 260 }, duration, { originX: 0, originY: 190 })
                ]);

                await Promise.all([
                    animateTo(toBeSortRH1Ref.current, { x: 80 }, duration, { originX: 0, originY: 190 }),
                    animateTo(toBeSortRH2Ref.current, { x: 110 }, duration, { originX: 0, originY: 190 })
                ]);



            })();

        }



    }, [isAnimating]);






    return (
        <Stage width={konvaWidth} height={konvaHeight} className={`w-[95%] h-[95%]`}>
            <Layer>
                {/*Top Array*/}
                <RectangleRenderer array={boxesInfo} offsetX={0} offsetY={50} />

                {/* Left Subarray from the top Array (offsetX = -50, offsetY = 120)*/}
                <RectangleRenderer array={left} offsetX={0} offsetY={0} groupRef={leftGroupRef} />

                {/* Right Subarray from the top Array (offsetX = 50, offsetY = 120)*/}

                <RectangleRenderer array={right} offsetX={0} offsetY={0} groupRef={rightGroupRef} />

                {/* Left Subarray from the Left Subarray */}

                <RectangleRenderer array={leftH1} offsetX={-100} offsetY={190} groupRef={leftH1Ref} />

                {/* Right Subarray from the Left Subarray */}
                <RectangleRenderer array={leftH2} offsetX={-70} offsetY={190} groupRef={leftH2Ref} />

                {/* Left subarray from the Right Subarray */}
                <RectangleRenderer array={rightH1} offsetX={80} offsetY={190} groupRef={rightH1Ref} />

                {/* Right subarray from the Right Subarray */}
                <RectangleRenderer array={rightH2} offsetX={110} offsetY={190} groupRef={rightH2Ref} />

                {/*Top Array with spaces*/}
                {/*<RectangleRenderer array={rectArraySpaces} offsetX={0} offsetY={260} />*/}

                {/*To be sorted leftH1*/}

                <SortRectangleRenderer array={toBeSortedLeftH1} offsetX={-100} offsetY={260} groupRef={toBeSortLH1Ref} opacity={1}
                />

                {/*To be sorted leftH2*/}

                <SortRectangleRenderer array={toBeSortedLeftH2} offsetX={-100} offsetY={260} groupRef={toBeSortLH2Ref} opacity={1} />

                {/*To be sorted rightH1*/}
                <SortRectangleRenderer array={toBeSortedRightH1} offsetX={80} offsetY={260} groupRef={toBeSortRH1Ref} opacity={1} />

                {/*To be sorted rightH2*/}
                <SortRectangleRenderer array={toBeSortedRightH2} offsetX={110} offsetY={260} groupRef={toBeSortRH2Ref} opacity={1} />




                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}


                {/*Sorted left h1*/}
                <SortRectangleRenderer array={sortedLeftH1} offsetX={-100} offsetY={330} groupRef={sortedLeftH1Ref} opacity={opacity1} />

                {/*Sorted left h2*/}
                <SortRectangleRenderer array={sortedLeftH2} offsetX={-70} offsetY={320} groupRef={sortedLeftH2Ref} opacity={opacity1} />

                {/*Sorted right H1*/}
                <SortRectangleRenderer array={sortedRightH1} offsetX={80} offsetY={320} groupRef={sortedRightH1Ref} opacity={opacity1} />

                {/*Sorted right H2*/}
                <SortRectangleRenderer array={sortedRightH2} offsetX={110} offsetY={320} groupRef={sortedRightH2Ref} opacity={opacity1} />



                {/* Left Subarray from the Left Subarray (but sorted) */}
                <SortRectangleRenderer array={sortedLeft} offsetX={-50} offsetY={320} groupRef={sortedLeftRef} opacity={opacity2} />

                {/* Right Subarray from the Left Subarray (but sorted) */}
                <SortRectangleRenderer array={sortedRight} offsetX={50} offsetY={320} groupRef={sortedRightRef} opacity={opacity2} />

                {/* Moving sorted left array */}
                <SortRectangleRenderer array={movingSortedL} offsetX={-50} offsetY={320} groupRef={movingSortedLRef} opacity={opacity3} />

                {/* Moving sorted right array */}
                <SortRectangleRenderer array={movingSortedR} offsetX={50} offsetY={320} groupRef={movingSortedRRef} opacity={opacity3} />



                {/*the final fucking sorted array*/}
                <SortRectangleRenderer array={finalSortedArray} offsetX={0} offsetY={390} groupRef={finalSortedArrayRef} opacity={opacity4} />



            </Layer>
        </Stage>
    )
}



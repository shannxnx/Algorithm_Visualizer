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
    isAnimating?: boolean
}

interface rectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    number?: number,
    id: number,
    color?: string,
    node?: Konva.Rect
};


const konvaWidth: number = 655;
const konvaHeight: number = 420;

type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number,
    offsetY: number,



};

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];


function RectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {
    return (
        <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
            {
                array.map((r, id) => (
                    <Group

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






export const MergeSortKonva: React.FC<KonvaProps> = ({ x, y, boxesInfo, copyArray, isAnimating, rectCount }) => {

    const [rectArray, setRectArray] = useState<Array<rectInfo>>([]);
    const [rectArraySpaces, setRectArraySpaces] = useState<Array<rectInfo>>([]);
    const [finalSortedArray, setFinalSortedArray] = useState<Array<rectInfo>>([]);

    const [complexArray, setComplexArray] = useState<Array<Array<rectInfo>>>([]);

    //test
    const [left, setLeft] = useState<Array<rectInfo>>([]);
    const [right, setRight] = useState<Array<rectInfo>>([]);
    const [sortedLeft, setSortedLeft] = useState<Array<rectInfo>>([]);
    const [sortedRight, setSortedRight] = useState<Array<rectInfo>>([]);




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


    console.log("Is animating: ", isAnimating);

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
                color: colors[i % colors.length]
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

        const sortedLeft = [...lArray].sort((a, b) => a.number! - b.number!);
        const finalSortedLeft = sortedLeft.map((r, i) => ({
            ...r,
            x: startX + i * (rectWidth + spacing),

        }));

        const sortedRightNumber = [...rArray].map((r) => r.number).sort((a, b) => a! - b!);
        const finalSortedRight = [...rArray].map((r, i) => ({ ...r, number: sortedRightNumber[i] }))


        setLeft(lArray);
        setRight(rArray);

        //setSortedLeft(finalSortedLeft);
        //setSortedRight(finalSortedRight);




        const lArrayH1 = leftArray(lArray);
        const lArrayH2 = rightArray(lArray);

        const sortedNumberH1 = [...lArrayH1].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedH1 = [...lArrayH1].map((r, i) => ({ ...r, number: sortedNumberH1[i] }));
        //setSortedLeftH1(finalSortedH1);


        const sortedNumberH2 = [...lArrayH2].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedH2 = [...lArrayH2].map((r, i) => ({ ...r, number: sortedNumberH2[i] }));
        //setSortedLeftH2(finalSortedH2);


        const rArrayH1 = leftArray(rArray);
        const rArrayH2 = rightArray(rArray);


        const rightSortedNumberH1 = [...rArrayH1].map(r => r.number).sort((a, b) => a! - b!);
        const finalRightSortedH1 = [...rArrayH1].map((r, i) => ({ ...r, number: rightSortedNumberH1[i] }));
        //setSortedRightH1(finalRightSortedH1);


        const rightSortedNumberH2 = [...rArrayH2].map(r => r.number).sort((a, b) => a! - b!);
        const finalRightSortedH2 = [...rArrayH2].map((r, i) => ({ ...r, number: rightSortedNumberH2[i] }));
        //setSortedRightH2(finalRightSortedH2);


        setLeftH1(lArrayH1);
        setLeftH2(lArrayH2);
        setToBeSortedLeftH1(lArrayH1);
        setToBeSortedLeftH2(lArrayH2);


        setRightH1(rArrayH1);
        setRightH2(rArrayH2);
        setToBeSortedRightH1(rArrayH1);
        setToBeSortedRightH2(rArrayH2);



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
        generateArray(5);

    }, []);



    const leftGroupRef = useRef<Konva.Group>(null);
    const leftH1Ref = useRef<Konva.Group>(null);
    const leftH2Ref = useRef<Konva.Group>(null);
    const toBeSortLH1Ref = useRef<Konva.Group>(null);
    const toBeSortLH2Ref = useRef<Konva.Group>(null);


    const rightGroupRef = useRef<Konva.Group>(null);
    const rightH1Ref = useRef<Konva.Group>(null);
    const rightH2Ref = useRef<Konva.Group>(null);
    const toBeSortRH1Ref = useRef<Konva.Group>(null);
    const toBeSortRH2Ref = useRef<Konva.Group>(null);



    useEffect(() => {
        if (isAnimating && leftGroupRef.current && leftH1Ref.current && leftH2Ref.current) {
            const duration = 1350;

            (async () => {

                leftH1Ref.current!.x(-50);
                leftH2Ref.current!.x(-50);
                toBeSortLH1Ref.current!.x(-100);
                toBeSortLH2Ref.current!.x(-70);


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



            })();
        }

        if (isAnimating && rightGroupRef.current && rightH1Ref.current && rightH2Ref.current) {
            const duration = 1350;

            (async () => {

                rightH1Ref.current!.x(50);
                rightH2Ref.current!.x(50);
                toBeSortRH1Ref.current!.x(80);
                toBeSortRH2Ref.current!.x(110);

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
        <Stage width={konvaWidth} height={konvaHeight} className={`border-1 w-[95%] h-[95%]`}>
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
                <RectangleRenderer array={toBeSortedLeftH1} offsetX={-100} offsetY={260} groupRef={toBeSortLH1Ref} />

                {/*To be sorted leftH2*/}
                <RectangleRenderer array={toBeSortedLeftH2} offsetX={-70} offsetY={260} groupRef={toBeSortLH2Ref} />


                {/*To be sorted rightH1*/}
                <RectangleRenderer array={toBeSortedRightH1} offsetX={80} offsetY={260} groupRef={toBeSortRH1Ref} />

                {/*To be sorted rightH2*/}
                <RectangleRenderer array={toBeSortedRightH2} offsetX={110} offsetY={260} groupRef={toBeSortRH2Ref} />


                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}
                {/*----------------------------------------------------------------------------------------------------*/}


                {/*Sorted left h1*/}
                <RectangleRenderer array={sortedLeftH1} offsetX={-100} offsetY={320} />

                {/*Sorted left h2*/}
                <RectangleRenderer array={sortedLeftH2} offsetX={-70} offsetY={320} />

                {/*Sorted right H1*/}
                <RectangleRenderer array={sortedRightH1} offsetX={80} offsetY={320} />

                {/*Sorted right H2*/}
                <RectangleRenderer array={sortedRightH2} offsetX={110} offsetY={320} />

                {/* Left Subarray from the Left Subarray (but sorted) */}
                <RectangleRenderer array={sortedLeft} offsetX={-50} offsetY={380} />

                {/* Right Subarray from the Left Subarray (but sorted) */}
                <RectangleRenderer array={sortedRight} offsetX={50} offsetY={380} />

                {/*the final fucking sorted array*/}
                <RectangleRenderer array={finalSortedArray} offsetX={0} offsetY={430} />



            </Layer>
        </Stage>
    )
}



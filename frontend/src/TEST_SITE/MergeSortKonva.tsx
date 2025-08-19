import { Stage, Layer, Rect, Text, Group } from "react-konva"
import { testArray } from "../LIB/algoDummyDB";
import type React from "react";
import { useEffect, useState, type AriaAttributes } from "react";




const middle_x = window.innerWidth / 2;
const middle_y = window.innerHeight / 2;



type KonvaProps = {
    x: number,
    y: number,
    boxesInfo: Array<rectInfo>,
    rectCount: number
}

interface rectInfo {
    x: number,
    y: number,
    width: number,
    height: number,
    number?: number,
    id: number,
    color?: string,
};


const konvaWidth: number = 655;
const konvaHeight: number = 420;

type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number,
    offsetY: number

};

function RectangleRenderer({ array, offsetX = 0, offsetY = 0 }: rectArrayRenderProps) {
    return (
        <>
            {
                array.map((r, id) => (
                    <Group
                        draggable
                        key={`group-${id}`}
                        x={r.x + offsetX}
                        y={r.y + offsetY

                        }
                    >
                        <Rect
                            width={r.width}
                            height={r.height}
                            fill={r.color || "red"}
                            draggable
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
        </>
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
        //console.log("Hello World");
    }
    return [];
}

export const MergeSortKonva: React.FC<KonvaProps> = ({ x, y, boxesInfo }) => {

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

    const [rightH1, setRightH1] = useState<Array<rectInfo>>([]);
    const [rightH2, setRightH2] = useState<Array<rectInfo>>([]);

    const [sortedRightH1, setSortedRightH1] = useState<Array<rectInfo>>([]);
    const [sortedRightH2, setSortedRightH2] = useState<Array<rectInfo>>([]);

    const stageHeight = y + 50 + 50;


    function generateArray(length: number) {
        const array: Array<rectInfo> = [];
        let copyArray: Array<rectInfo> = [];


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
                number: Math.floor(Math.random() * 100)
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
            copyArray.push(copyRectangle);
        }




        //copyArray.map((r) => ({...r, r.}))

        const finalSortedNumber = [...array].map(r => r.number).sort((a, b) => a! - b!);
        const finalSortedArray = [...array].map((r, i) => ({ ...r, number: finalSortedNumber[i] }));

        setRectArray(array);
        setRectArraySpaces(copyArray);
        setFinalSortedArray(finalSortedArray);

        const lArray = leftArray(array);
        const rArray = rightArray(array);

        const sortedLeft = [...lArray].sort((a, b) => a.number! - b.number!);
        const finalSortedLeft = sortedLeft.map((r, i) => ({
            ...r,
            x: startX + i * (rectWidth + spacing),

        }));

        const sortedRightNumber = [...rArray].map((r) => r.number).sort((a, b) => a! - b!);
        const finalSortedRight = [...rArray].map((r, i) => ({ ...r, number: sortedRightNumber[i] }))


        setLeft(lArray);
        setRight(rArray);
        setSortedLeft(finalSortedLeft);
        setSortedRight(finalSortedRight);




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
        setRightH1(rArrayH1);
        setRightH2(rArrayH2);






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


    //console.log("Left array: ", left);
    //console.log("Right array: ", right);

    console.log("Left array: ", left);
    console.log("Left array H2: ", sortedLeftH2);



    const renderRectangle = (rArray: Array<rectInfo>) => {
        return rArray.map((r, id) => (
            <Group
                draggable
                key={`group-${id}`}
                x={r.x}
                y={r.y + 50} // Start 50px lower to accommodate lift
            >
                <Rect
                    width={r.width}
                    height={r.height}
                    fill={r.color || "red"}
                    draggable
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
        ));
    }



    return (
        <Stage width={konvaWidth} height={konvaHeight} className={`border-1 w-[95%] h-[95%]`}>
            <Layer>
                {/*Top Array*/}
                <RectangleRenderer array={rectArray} offsetX={0} offsetY={50} />

                {/* Left Subarray from the top Array */}
                <RectangleRenderer array={left} offsetX={-50} offsetY={120} />

                {/* Right Subarray from the top Array */}
                <RectangleRenderer array={right} offsetX={50} offsetY={120} />

                {/* Left Subarray from the Left Subarray */}
                <RectangleRenderer array={leftH1} offsetX={-100} offsetY={190} />

                {/* Right Subarray from the Left Subarray */}
                <RectangleRenderer array={leftH2} offsetX={-70} offsetY={190} />

                {/* Left subarray from the Right Subarray */}
                <RectangleRenderer array={rightH1} offsetX={80} offsetY={190} />

                {/* Right subarray from the Right Subarray */}
                <RectangleRenderer array={rightH2} offsetX={110} offsetY={190} />

                {/*Top Array with spaces*/}
                <RectangleRenderer array={rectArraySpaces} offsetX={-20} offsetY={260} />

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



import { Stage, Layer, Rect, Text, Group } from "react-konva"
import { testArray } from "../LIB/algoDummyDB";
import type React from "react";
import { useEffect, useState } from "react";




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

export const MergeSortKonva: React.FC<KonvaProps> = ({ x, y, boxesInfo }) => {

    const [rectArray, setRectArray] = useState<Array<rectInfo>>([]);

    //test
    const [left, setLeft] = useState<Array<rectInfo>>([]);
    const [right, setRight] = useState<Array<rectInfo>>([]);

    const stageHeight = y + 50 + 50;
    console.log("X in mergeKonva: ", x);


    function generateArray(length: number) {
        const array: Array<rectInfo> = [];



        const rectWidth = length > 6 ? 35 : 50;
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
            array.push(rectangle);
        }
        setRectArray(array);
        splitArray(array);

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
            console.log("Hello World");
        }
    }

    useEffect(() => {
        generateArray(6);


    }, []);


    console.log("Left array: ", left);
    console.log("Right array: ", right);






    return (
        <Stage width={konvaWidth} height={konvaHeight} className={`border-1 w-[95%] h-[95%]`}>
            <Layer>
                {rectArray.map((r, id) => (
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

                        {/*Small bug in here fix this in the near future*/}

                        {
                            //<Text
                            //    text={`${id}`}
                            //    y={r.height + 5}
                            //    width={r.width}
                            //    height={20}
                            //    align="center"
                            //    verticalAlign="top"
                            //    fill="black"
                            //    fontSize={12}
                            ///>
                        }

                    </Group>


                ))}

                {
                    left.map((r, id) => (
                        <Group
                            draggable
                            key={`group-${id}`}
                            x={r.x - 50}
                            y={r.y + 120}
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
                    ))}

                {
                    right.map((r, id) => (
                        <Group
                            draggable
                            key={`group-${id}`}
                            x={r.x + 50}
                            y={r.y + 120}
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
                    ))}








            </Layer>
        </Stage>
    )
}


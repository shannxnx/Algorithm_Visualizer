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

    const stageHeight = y + 50 + 50;
    console.log("X in mergeKonva: ", x);


    function generateArray(length: number) {
        const array: Array<rectInfo> = [];

        for (let i = 0; i < length; i++) {
            const rectangle: rectInfo = {
                x: (i * 55) + (konvaWidth / 2),
                y: -45,
                width: 50,
                height: 50,
                id: i,
                number: i + 1
            }
            array.push(rectangle);
        }
        setRectArray(array);

    }

    useEffect(() => {
        generateArray(5);

    }, []);

    console.log("Array merge: ", rectArray);



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






            </Layer>
        </Stage>
    )
}


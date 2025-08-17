
import { Stage, Layer, Rect, Text, Group } from "react-konva"
import { testArray } from "../LIB/algoDummyDB";
import type React from "react";




const middle_x = window.innerWidth / 2;
const middle_y = window.innerHeight / 2;

/*
prevX + 30
prev_y - 25
height + 25


-------------------------------------------------------
<Rect x={middle_x} y={middle_y} width={25} height={25} fill="red" />
<Rect x={middle_x + 30} y={middle_y - 25} width={25} height={25 + 25} fill="red" />
<Rect x={middle_x + 30 + 30} y={middle_y - 25 - 25} width={25} height={25 + 25 + 25} fill="red" />
*/




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




export const Konva1: React.FC<KonvaProps> = ({ x, y, boxesInfo }) => {
    // Calculate needed height based on maximum lift (50px) plus rectangle height (50px) plus index space (25px)
    const stageHeight = y + 50 + 50; // Original y + lift + rect height + index space

    return (
        <Stage width={x} height={stageHeight} className="">
            <Layer>
                {boxesInfo.map((r, id) => (
                    <Group
                        key={`group-${id}`}
                        x={r.x}
                        y={r.y + 50} // Start 50px lower to accommodate lift
                    >
                        <Rect
                            width={r.width}
                            height={r.height}
                            fill={r.color || "red"}
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
                        <Text
                            text={`${id}`}
                            y={r.height + 5}
                            width={r.width}
                            height={20}
                            align="center"
                            verticalAlign="top"
                            fill="black"
                            fontSize={12}
                        />
                    </Group>


                ))}






            </Layer>
        </Stage>
    )
}


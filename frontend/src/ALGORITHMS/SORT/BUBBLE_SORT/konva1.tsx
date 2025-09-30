import { Stage, Layer, Rect, Text, Group } from "react-konva"

import type React from "react";


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


export const Konva1: React.FC<KonvaProps> = ({ x, y, boxesInfo }) => {

    const stageHeight = y + 50 + 50;

    return (
        <Stage width={x} height={stageHeight} className="">
            <Layer>
                {boxesInfo.map((r, id) => (
                    <Group
                        key={`group-${id}`}
                        x={r.x}
                        y={r.y + 50}
                    >
                        <Rect
                            width={r.width}
                            height={r.height}
                            fill={r.color || "red"}
                            cornerRadius={5}
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


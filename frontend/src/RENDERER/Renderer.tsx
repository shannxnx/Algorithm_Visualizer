import { Stage, Layer, Rect, Text, Group } from "react-konva"
import type React from "react";
import { useEffect, useRef, useState, type AriaAttributes, type Ref, type RefObject } from "react";
import Konva from "konva";
import type { rectInfo } from "../INTERFACES && TYPES/sortInterface";

//interface rectInfo {
//    x: number,
//    y: number,
//    width: number,
//    height: number,
//    number?: number,
//    id: number,
//    color?: string,
//    node?: Konva.Node
//};


type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number,
    offsetY: number,
    opacity?: number,


};


export function RectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {
    console.log("Array (renderer): ", array);

    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array.map((r, id) => (
                <Group
                    ref={(node) => { if (node) r.node = node }}
                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x}
                    y={r.y}
                    scaleX={r.scaleX ?? 1}
                    scaleY={r.scaleY ?? 1}
                >
                    <Rect

                        width={r.width}
                        height={r.height}
                        fill={r.color}
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



                </Group>


            ))
        }
    </Group>
    )
}

export function SortRectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps
    & { groupRef: React.RefObject<Konva.Group | null> }
) {




    return <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY} opacity={opacity}>
        {
            array.map((r, id) => (
                <Group key={`group-${id}`} x={r.x} y={r.y} ref={(node) => { if (node) r.node = node }}>
                    <Rect
                        width={r.width}
                        height={r.height}
                        fill={"blue"}
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



                </Group>
            ))
        }
    </Group>
}

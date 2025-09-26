import { Stage, Layer, Rect, Text, Group } from "react-konva"
import type React from "react";
import { useEffect, useRef, useState, type AriaAttributes, type Ref, type RefObject } from "react";
import Konva from "konva";
import type { rectInfo } from "../INTERFACES && TYPES/sortInterface";
import { computeSlotX } from "../ALGORITHMS/SORT/HELPER_FUNCTION/animation.helper";


type rectArrayRenderProps = {
    array: Array<rectInfo>;
    offsetX: number;
    offsetY: number;
    opacity?: number;


};


type singleGroupRectProps = {
    rectInfo: rectInfo,
    groupRef: React.Ref<Konva.Group | null>,
    offsetX?: number,
    offsetY?: number,
    opacity?: number
};


export function RectangleGroup({ rectInfo, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: singleGroupRectProps) {
    return (
        <Group
            ref={groupRef}
            x={rectInfo.x + offsetX}
            y={rectInfo.y + offsetY}
            scaleX={rectInfo.scaleX ?? 1}
            scaleY={rectInfo.scaleY ?? 1}
        >
            <Group offsetX={rectInfo.width / 2} offsetY={rectInfo.height / 2}>
                <Rect width={rectInfo.width} height={rectInfo.height} fill={rectInfo.color} cornerRadius={5} />
                <Text
                    text={`${rectInfo.number}`}
                    width={rectInfo.width}
                    height={rectInfo.height}
                    align="center"
                    verticalAlign="middle"
                    fill="white"
                    fontSize={20}
                />
            </Group>
        </Group>
    );
}





export function SingleRectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {


    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array.map((r, id) => (
                <Group
                    ref={(node) => { if (node) r.node = node }}
                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x}
                    y={r.y}
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




export function RectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {


    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array.map((r, id) => (
                <Group
                    ref={(node) => { if (node) r.node = node }}
                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x}
                    y={r.y}

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



//this function is for array animation that need scaling or pulsing effect
export function RectangleRendererScale({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {


    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array.map((r, id) => (
                <Group
                    ref={(node) => { if (node) r.node = node }}
                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x + r.width / 2}
                    y={r.y + r.height / 2}
                    scaleX={r.scaleX ?? 1}
                    scaleY={r.scaleY ?? 1}
                    offsetX={r.width / 2}
                    offsetY={r.height / 2}
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

export function RectangleRendererIS({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1, }: rectArrayRenderProps &
{ groupRef?: React.RefObject<Konva.Group | null> }) {


    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array.map((r, id) => (
                <Group
                    ref={(node) => { if (node) r.node = node }}
                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x}
                    y={r.y + r.height / 2}
                    scaleX={r.scaleX ?? 1}
                    scaleY={r.scaleY ?? 1}
                    offsetX={r.width / 2}
                    offsetY={r.height / 2}
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



//this is for array that need to be sorted or will be use in sorting animation
export function SortRectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps
    & { groupRef: React.RefObject<Konva.Group | null> }
) {




    return <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY} opacity={opacity} >
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

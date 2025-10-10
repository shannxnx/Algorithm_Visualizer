import { Stage, Layer, Rect, Text, Group } from "react-konva"
import type React from "react";
import { useEffect, useRef, useState, type AriaAttributes, type Ref, type RefObject } from "react";
import Konva from "konva";
import type { rectInfo } from "../INTERFACES && TYPES/sortInterface";
import type { indexInterface } from "../ALGORITHMS/SORT/INSERTION_SORT/InsertionSortKonva";


type rectArrayRenderProps = {
    array?: Array<rectInfo>;
    offsetX: number;
    offsetY: number;
    opacity?: number;
    index?: indexInterface[]



};


type SelectionPropsRenderer = {
    array?: Array<rectInfo>;
    offsetX: number;
    offsetY: number;
    opacity?: number;
    index?: indexInterface[],
    nodeMapRef?: React.RefObject<Map<number, Konva.Group>>

}

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
            array!.map((r, id) => (
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
            array!.map((r, id) => (
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
            array!.map((r, id) => (
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
            array!.map((r, id) => (
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



export function RectangleRendererSelection({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1, nodeMapRef }: SelectionPropsRenderer &
{ groupRef?: React.RefObject<Konva.Group | null> }) {


    return (<Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY}>
        {
            array!.map((r, id) => (
                <Group
                    ref={(node) => {
                        if (!node) nodeMapRef!.current.delete(r.id!);
                        else nodeMapRef!.current.set(r.id!, node);
                    }}
                    opacity={opacity}
                    key={r.id}
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

export function RectangleIndex({ offsetX = 0, offsetY = 0, opacity = 1, index }: rectArrayRenderProps) {
    return (<Group x={offsetX} y={offsetY}>
        {
            index!.map((r, id) => (
                <Group

                    opacity={opacity}
                    key={`group-${id}`}
                    x={r.x}
                    y={r.y + r.height / 2}
                    scaleX={r.scaleX ?? 1}
                    scaleY={r.scaleY ?? 1}
                    offsetX={r.width / 2}
                    offsetY={r.height / 2}
                >

                    <Text

                        text={`${r.index}`}
                        width={r.width}
                        height={r.height}
                        y={r.width + 5}
                        align="center"
                        verticalAlign="middle"
                        fill="black"
                        fontSize={20}


                    />





                </Group>


            ))


        }
    </Group>)
}



//this is for array that need to be sorted or will be use in sorting animation
export function SortRectangleRenderer({ array, offsetX = 0, offsetY = 0, groupRef, opacity = 1 }: rectArrayRenderProps
    & { groupRef: React.RefObject<Konva.Group | null> }
) {




    return <Group ref={groupRef} x={groupRef ? 0 : offsetX} y={groupRef ? 0 : offsetY} opacity={opacity} >
        {
            array!.map((r, id) => (
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


//React.Dispatch<React.SetStateAction<rectInfo[]>>
interface gridRendererProps {
    array: rectInfo[],
    setArray: (id: string) => void,
    x?: number,
    y?: number
}

export function MazeGridRenderer({ array, setArray }: gridRendererProps) {
    return array.map((r, id) => (
        <Group x={r.x} y={r.y} key={r.stringId}
            onClick={() => setArray(r.stringId!)}
        >
            <Rect
                width={r.width}
                height={r.height}
                fill={r.color}

            />
        </Group>
    ))
};
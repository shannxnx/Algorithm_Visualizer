
import { Stage, Layer, Rect, Text } from "react-konva"
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






export const Konva1: React.FC<KonvaProps> = ({ x, y, boxesInfo, rectCount }) => {

    //    console.log("Test Array: ", testArray);
    //
    //
    //
    //    const boxCount = Math.floor(x / width);
    //    console.log(boxCount);
    //
    //    //const boxesInfo: Array<rectInfo> = [];
    //
    //
    //    for (let i = 0; i < boxCount - 1; i++) {
    //        const rect: rectInfo = {
    //            width: width,
    //            height: y,
    //            x: i * (width + 5),
    //            y: 0,
    //            number: `${i}`
    //
    //        };
    //
    //        boxesInfo.push(rect);
    //    }
    //
    //    console.log(boxesInfo);
    //
    return (<Stage width={x} height={y + 25} className="">

        <Layer>

            {
                //testArray && Array.isArray(testArray) && testArray.map((i) =>
                //    <Rect x={i.x_pos}
                //        y={i.y_pos}
                //        width={i.width}
                //        height={i.height}

                //        fill={i.color}
                //    />)
                //<Rect x={0} y={0} height={y} width={50} fill="red" draggable />
            }


            {
                boxesInfo.length > 0 ? boxesInfo.map((r, id) =>
                    <Rect width={r.width} height={r.height} key={id}
                        x={r.x} y={r.y} fill={r.color || "red"} />

                )
                    : null
            }

            {
                boxesInfo.length > 0 ? boxesInfo.map((r) => <Text text={`${r.number}`} key={`${r.x}-${r.y}`}
                    x={r.x} y={r.y} width={r.width} height={r.height} align="center" verticalAlign="middle" fill={"black"}
                    fontSize={20} />
                )
                    : null
            }

            {
                boxesInfo.length > 0 ? boxesInfo.map((r, i) => <Text key={`${r.x}-${r.y}`} text={`${i}`}
                    x={r.x} y={r.y + 40} width={r.width} height={r.height} align="center" verticalAlign="middle" fill={"black"}
                    fontSize={12} />
                )
                    : null
            }












        </Layer>

    </Stage>
    )


}







//export const Konva1: React.FC<KonvaProps> = ({ x, y, boxesInfo, rectCount }) => {
//    return (
//        <Stage width={x + 100} height={y + 100} className="">
//            <Layer>
//                {/* Render rectangles */}
//                {
//                    boxesInfo.length > 0 ? boxesInfo.map((r, index) =>
//                        <Rect
//                            width={r.width}
//                            height={r.height}
//                            key={`rect-${index}`}
//                            x={r.x}
//                            y={r.y}
//                            fill={r.color || "#3B82F6"}
//                            stroke="#ffffff"
//                            strokeWidth={2}
//                            cornerRadius={4}
//                        />
//                    ) : null
//                }
//
//                {/* Render number text (the values) */}
//                {
//                    boxesInfo.length > 0 ? boxesInfo.map((r, index) =>
//                        <Text
//                            text={`${r.number}`}
//                            key={`number-${index}`}
//                            x={r.x}
//                            y={r.y}
//                            width={r.width}
//                            height={r.height}
//                            align="center"
//                            verticalAlign="middle"
//                            fill="white"
//                            fontSize={20}
//                            fontStyle="bold"
//                            fontFamily="Arial"
//                        />
//                    ) : null
//                }
//
//                {/* Render index text (the position indices) */}
//                {
//                    boxesInfo.length > 0 ? boxesInfo.map((r, index) =>
//                        <Text
//                            key={`index-${index}`}
//                            text={`${index}`}
//                            x={r.x}
//                            y={r.y + r.height + 5}
//                            width={r.width}
//                            height={20}
//                            align="center"
//                            verticalAlign="middle"
//                            fill="#374151"
//                            fontSize={12}
//                            fontFamily="Arial"
//                        />
//                    ) : null
//                }
//            </Layer>
//        </Stage>
//    )
//}




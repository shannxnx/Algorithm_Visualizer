
import { Stage, Layer, Rect } from "react-konva"
import { testArray } from "../LIB/algoDummyDB";




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

export default function Konva1() {

    console.log("Test Array: ", testArray);

    return (<Stage width={window.innerWidth} height={window.innerHeight}>

        <Layer>

            {
                testArray && Array.isArray(testArray) && testArray.map((i) =>
                    <Rect x={i.x_pos}
                        y={i.y_pos}
                        width={i.width}
                        height={i.height}
                        fill={i.color}
                    />)
            }





        </Layer>

    </Stage>)


}







import { Layer, Stage } from "react-konva";
import type { rectInfo } from "../../../INTERFACES && TYPES/sortInterface";
import { useEffect, useState } from "react";
import { MazeGridRenderer } from "../../../RENDERER/Renderer";



const generateGridRects = () => {

    const returnThis: rectInfo[] = [];
    const cellSize = 30;
    const gap = 2;

    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 18; j++) {
            const xPos: number = j * (cellSize + gap);
            const yPos: number = i * (cellSize + gap);
            const id = `cell:${i}-${j}`;

            const rect: rectInfo = {
                stringId: id,
                x: xPos,
                y: yPos,
                width: 30,
                height: 30,
                number: Math.floor(Math.random() * 100),
                color: "blue"

            };

            returnThis.push(rect);


        }
    }


    return returnThis;
}


export default function DfsKonva() {

    const [rectInfo, setRectInfo] = useState<rectInfo[]>([]);
    const [gridMap, setGridMap] = useState<Record<string, rectInfo>>({});

    const handleClick = (id: string) => {
        setRectInfo((prev) => prev.map((cell) => cell.stringId === id ? { ...cell, color: 'red' } : cell));
    };


    useEffect(() => {
        const grids: rectInfo[] = generateGridRects();
        setRectInfo(grids);
    }, [])


    return <Stage width={575} height={540} className="border-1 border-black">

        <Layer>
            <MazeGridRenderer array={rectInfo} setArray={handleClick} />
        </Layer>

    </Stage>


}
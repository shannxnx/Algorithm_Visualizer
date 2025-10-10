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
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    const [start, setStart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);

    useEffect(() => {
        const grids: rectInfo[] = generateGridRects();
        setRectInfo(grids);
    }, []);

    const handleReset = () => {
        setRectInfo(generateGridRects());
    }


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

            if (e.key === 'r' || e.key === "R") {
                handleReset();
                return;
            }


            setKeyPressed(e.key.toLowerCase())
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            setKeyPressed(null);
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };


    }, []);



    const handleClick = (id: string) => {
        if (!keyPressed) return;
        let color = '';


        if (keyPressed === 's' && start === false) {
            color = 'red';
            setStart(true);
        }
        else if (keyPressed === 'e' && end === false) {
            color = 'black'
            setEnd(true);

        }
        else if (keyPressed === 'w') {
            color = 'gray'
        }
        else return;

        setRectInfo((prev) => prev.map((cell) => cell.stringId === id ? { ...cell, color: color } : cell));


    };



    return <Stage width={575} height={540} className="border-1 border-black">

        <Layer>
            <MazeGridRenderer array={rectInfo} setArray={handleClick} />
        </Layer>

    </Stage>


}